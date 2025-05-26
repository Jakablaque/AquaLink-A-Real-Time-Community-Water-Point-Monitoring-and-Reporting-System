
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation, 
  Droplets, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock water sources data
  const waterSources = [
    {
      id: 1,
      name: "Central Park Well",
      status: "functional",
      latitude: 40.7829,
      longitude: -73.9654,
      description: "Main water source for central district",
      lastChecked: "2 hours ago",
      reports: 0
    },
    {
      id: 2,
      name: "Community Center Tap",
      status: "broken",
      latitude: 40.7614,
      longitude: -73.9776,
      description: "Water tap at community center",
      lastChecked: "1 day ago",
      reports: 3
    },
    {
      id: 3,
      name: "School Fountain",
      status: "contaminated",
      latitude: 40.7505,
      longitude: -73.9934,
      description: "Drinking fountain at elementary school",
      lastChecked: "3 hours ago",
      reports: 1
    },
    {
      id: 4,
      name: "Park Well #2",
      status: "functional",
      latitude: 40.7749,
      longitude: -73.9442,
      description: "Secondary park water source",
      lastChecked: "30 minutes ago",
      reports: 0
    },
    {
      id: 5,
      name: "Market Square Pump",
      status: "dry",
      latitude: 40.7589,
      longitude: -73.9851,
      description: "Hand pump at market square",
      lastChecked: "5 hours ago",
      reports: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'functional': return 'bg-green-500';
      case 'broken': return 'bg-red-500';
      case 'contaminated': return 'bg-orange-500';
      case 'dry': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'functional': return <CheckCircle className="h-4 w-4" />;
      case 'broken': return <XCircle className="h-4 w-4" />;
      case 'contaminated': return <AlertTriangle className="h-4 w-4" />;
      case 'dry': return <Droplets className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredSources = waterSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || source.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Simulate map functionality
  useEffect(() => {
    if (mapRef.current) {
      // This would be where you'd initialize your actual map library (Leaflet, Mapbox, etc.)
      console.log("Map initialized");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Water Sources Map</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button onClick={() => navigate('/report')}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search & Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search water sources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status Filter</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="all">All Sources</option>
                    <option value="functional">Functional</option>
                    <option value="broken">Broken</option>
                    <option value="contaminated">Contaminated</option>
                    <option value="dry">Dry</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Sources List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Water Sources ({filteredSources.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredSources.map((source) => (
                    <div
                      key={source.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedSource?.id === source.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSource(source)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{source.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{source.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Last checked: {source.lastChecked}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge 
                            variant={source.status === 'functional' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {getStatusText(source.status)}
                          </Badge>
                          {source.reports > 0 && (
                            <span className="text-xs text-red-600">{source.reports} report(s)</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <div 
                  ref={mapRef} 
                  className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg relative overflow-hidden"
                >
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Interactive Map</h3>
                      <p className="text-gray-500">
                        In a real implementation, this would show an interactive map
                        <br />
                        with water source markers and current selection
                      </p>
                    </div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button size="sm" variant="secondary">
                      <Navigation className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Mock Markers */}
                  <div className="absolute inset-0">
                    {filteredSources.map((source, index) => (
                      <div
                        key={source.id}
                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(source.status)} text-white shadow-lg hover:scale-110 transition-transform`}
                        style={{
                          left: `${20 + (index * 15)}%`,
                          top: `${30 + (index * 10)}%`
                        }}
                        onClick={() => setSelectedSource(source)}
                      >
                        {getStatusIcon(source.status)}
                      </div>
                    ))}
                  </div>

                  {/* Selected Source Info */}
                  {selectedSource && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{selectedSource.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{selectedSource.description}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <Badge variant={selectedSource.status === 'functional' ? 'secondary' : 'destructive'}>
                                  {getStatusText(selectedSource.status)}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  Last checked: {selectedSource.lastChecked}
                                </span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => navigate('/report', { state: { sourceId: selectedSource.id } })}
                            >
                              Report Issue
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
