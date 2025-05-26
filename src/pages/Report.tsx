
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Droplets, 
  MapPin, 
  Camera, 
  Mic, 
  Upload,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    waterSource: location.state?.sourceId || "",
    issueType: "",
    description: "",
    latitude: "",
    longitude: "",
    urgency: "",
    affectedPeople: "",
    contactInfo: "",
    allowContact: false
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [voiceNote, setVoiceNote] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock water sources for dropdown
  const waterSources = [
    { id: "1", name: "Central Park Well" },
    { id: "2", name: "Community Center Tap" },
    { id: "3", name: "School Fountain" },
    { id: "4", name: "Park Well #2" },
    { id: "5", name: "Market Square Pump" },
  ];

  const issueTypes = [
    "No water flow",
    "Contaminated water",
    "Broken pump/tap",
    "Low water pressure",
    "Strange taste/odor",
    "Visible contamination",
    "Infrastructure damage",
    "Other"
  ];

  const urgencyLevels = [
    { value: "low", label: "Low - Can wait" },
    { value: "medium", label: "Medium - Needs attention" },
    { value: "high", label: "High - Urgent" },
    { value: "critical", label: "Critical - Emergency" }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos(prev => [...prev, ...files].slice(0, 5)); // Max 5 photos
  };

  const handleVoiceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVoiceNote(file);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
          toast({
            title: "Location acquired",
            description: "Your current location has been added to the report.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      toast({
        title: "Report submitted successfully!",
        description: "Your water source issue has been reported. We'll investigate soon.",
      });
      setIsSubmitting(false);
      navigate("/my-reports");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Report Water Issue</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/map')}>
                <MapPin className="h-4 w-4 mr-2" />
                View Map
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-orange-600" />
              Submit Water Source Issue Report
            </CardTitle>
            <CardDescription>
              Help us identify and resolve water access issues in your community. 
              All information will be reviewed by our response team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Water Source Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="waterSource">Water Source *</Label>
                  <Select 
                    value={formData.waterSource} 
                    onValueChange={(value) => handleInputChange('waterSource', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a water source" />
                    </SelectTrigger>
                    <SelectContent>
                      {waterSources.map((source) => (
                        <SelectItem key={source.id} value={source.id}>
                          {source.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="new">+ Add New Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueType">Issue Type *</Label>
                  <Select 
                    value={formData.issueType} 
                    onValueChange={(value) => handleInputChange('issueType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Location</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={getCurrentLocation}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Current Location
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      placeholder="e.g., 40.7128"
                      value={formData.latitude}
                      onChange={(e) => handleInputChange('latitude', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      placeholder="e.g., -74.0060"
                      value={formData.longitude}
                      onChange={(e) => handleInputChange('longitude', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Issue Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe the water issue in detail. Include when you first noticed it, how it affects water access, and any other relevant information..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>

              {/* Priority and Impact */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select 
                    value={formData.urgency} 
                    onValueChange={(value) => handleInputChange('urgency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="affectedPeople">People Affected (estimate)</Label>
                  <Input
                    id="affectedPeople"
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.affectedPeople}
                    onChange={(e) => handleInputChange('affectedPeople', e.target.value)}
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <Label>Attachments (Optional)</Label>
                
                {/* Photo Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <Label htmlFor="photos" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500">Upload photos</span>
                      <span className="text-gray-600"> of the water source issue</span>
                    </Label>
                    <Input
                      id="photos"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5 files</p>
                  </div>
                  
                  {photos.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-600">{photo.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removePhoto(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Voice Note Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="text-center">
                    <Mic className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <Label htmlFor="voiceNote" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500">Upload voice note</span>
                      <span className="text-gray-600"> (optional)</span>
                    </Label>
                    <Input
                      id="voiceNote"
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={handleVoiceUpload}
                    />
                    <p className="text-xs text-gray-500 mt-1">MP3, WAV, M4A up to 10MB</p>
                  </div>
                  
                  {voiceNote && (
                    <div className="mt-4 p-2 bg-blue-50 rounded-lg flex items-center justify-between">
                      <span className="text-sm text-blue-800">{voiceNote.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setVoiceNote(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <Label>Contact Information (Optional)</Label>
                <Input
                  placeholder="Your phone number or email for follow-up"
                  value={formData.contactInfo}
                  onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                />
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowContact"
                    checked={formData.allowContact}
                    onCheckedChange={(checked) => handleInputChange('allowContact', checked as boolean)}
                  />
                  <Label htmlFor="allowContact" className="text-sm">
                    Allow authorities to contact me for additional information about this report
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formData.waterSource || !formData.issueType || !formData.description}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <Upload className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;
