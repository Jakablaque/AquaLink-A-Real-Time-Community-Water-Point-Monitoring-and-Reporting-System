
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Droplets, 
  Search, 
  Filter,
  Calendar,
  MapPin,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyReports = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock user reports data
  const reports = [
    {
      id: "RPT-001",
      waterSource: "Central Park Well",
      issueType: "No water flow",
      description: "The main pump appears to be broken. No water coming out when handle is operated.",
      status: "in_progress",
      urgency: "high",
      submittedDate: "2024-01-15T10:30:00Z",
      lastUpdate: "2024-01-16T14:20:00Z",
      assignedTo: "Tech Team Alpha",
      estimatedResolution: "2024-01-18",
      affectedPeople: 150,
      photos: 2,
      hasVoiceNote: true
    },
    {
      id: "RPT-002", 
      waterSource: "School Fountain",
      issueType: "Contaminated water",
      description: "Water has a strange green color and smells unusual. Children reported stomach issues after drinking.",
      status: "resolved",
      urgency: "critical",
      submittedDate: "2024-01-10T08:15:00Z",
      lastUpdate: "2024-01-12T16:45:00Z",
      assignedTo: "Health Inspector",
      resolution: "Water source cleaned and tested. New filtration system installed.",
      affectedPeople: 300,
      photos: 3,
      hasVoiceNote: false
    },
    {
      id: "RPT-003",
      waterSource: "Market Square Pump",
      issueType: "Low water pressure",
      description: "Water pressure has been decreasing over the past week. Takes very long to fill containers.",
      status: "new",
      urgency: "medium", 
      submittedDate: "2024-01-18T16:22:00Z",
      lastUpdate: "2024-01-18T16:22:00Z",
      assignedTo: null,
      affectedPeople: 75,
      photos: 1,
      hasVoiceNote: false
    },
    {
      id: "RPT-004",
      waterSource: "Community Center Tap",
      issueType: "Broken pump/tap",
      description: "Handle is completely broken off. Metal parts are rusted and sharp.",
      status: "rejected",
      urgency: "high",
      submittedDate: "2024-01-05T12:10:00Z",
      lastUpdate: "2024-01-07T09:30:00Z",
      assignedTo: "Maintenance Team",
      rejectionReason: "Duplicate report - already addressed in RPT-887",
      affectedPeople: 200,
      photos: 4,
      hasVoiceNote: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'in_progress': return 'secondary';
      case 'resolved': return 'outline';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <AlertTriangle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusCounts = () => {
    return {
      all: reports.length,
      new: reports.filter(r => r.status === 'new').length,
      in_progress: reports.filter(r => r.status === 'in_progress').length,
      resolved: reports.filter(r => r.status === 'resolved').length,
      rejected: reports.filter(r => r.status === 'rejected').length
    };
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.waterSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/map')}>
                <MapPin className="h-4 w-4 mr-2" />
                View Map
              </Button>
              <Button onClick={() => navigate('/report')}>
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reports by ID, location, or issue type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
          >
            <option value="all">All Status ({statusCounts.all})</option>
            <option value="new">New ({statusCounts.new})</option>
            <option value="in_progress">In Progress ({statusCounts.in_progress})</option>
            <option value="resolved">Resolved ({statusCounts.resolved})</option>
            <option value="rejected">Rejected ({statusCounts.rejected})</option>
          </select>
        </div>

        {/* Status Tabs */}
        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
            <TabsTrigger value="new">New ({statusCounts.new})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({statusCounts.in_progress})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({statusCounts.resolved})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({statusCounts.rejected})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No reports found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria."
                    : "You haven't submitted any reports yet."
                  }
                </p>
                <Button onClick={() => navigate('/report')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Your First Report
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {report.waterSource}
                        </h3>
                        <Badge variant={getStatusColor(report.status)} className="flex items-center space-x-1">
                          {getStatusIcon(report.status)}
                          <span>{report.status.replace('_', ' ').toUpperCase()}</span>
                        </Badge>
                        <span className={`text-sm font-medium ${getUrgencyColor(report.urgency)}`}>
                          {report.urgency.toUpperCase()} PRIORITY
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Report ID:</strong> {report.id}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Issue Type:</strong> {report.issueType}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Affected People:</strong> ~{report.affectedPeople}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Submitted:</strong> {formatDate(report.submittedDate)}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Last Update:</strong> {formatDate(report.lastUpdate)}
                          </p>
                          {report.assignedTo && (
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Assigned to:</strong> {report.assignedTo}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {report.description}
                      </p>

                      {/* Attachments */}
                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                        {report.photos > 0 && (
                          <span className="flex items-center">
                            📷 {report.photos} photo{report.photos > 1 ? 's' : ''}
                          </span>
                        )}
                        {report.hasVoiceNote && (
                          <span className="flex items-center">
                            🎤 Voice note
                          </span>
                        )}
                      </div>

                      {/* Status-specific information */}
                      {report.status === 'resolved' && report.resolution && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                          <h4 className="font-medium text-green-800 mb-1">Resolution</h4>
                          <p className="text-sm text-green-700">{report.resolution}</p>
                        </div>
                      )}

                      {report.status === 'rejected' && report.rejectionReason && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                          <h4 className="font-medium text-red-800 mb-1">Rejection Reason</h4>
                          <p className="text-sm text-red-700">{report.rejectionReason}</p>
                        </div>
                      )}

                      {report.status === 'in_progress' && report.estimatedResolution && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                          <h4 className="font-medium text-blue-800 mb-1">Progress Update</h4>
                          <p className="text-sm text-blue-700">
                            Estimated resolution: {new Date(report.estimatedResolution).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>

                    <Button variant="outline" size="sm" className="ml-4">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary Stats */}
        {filteredReports.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{reports.length}</div>
                <div className="text-sm text-gray-600">Total Reports</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{statusCounts.resolved}</div>
                <div className="text-sm text-gray-600">Resolved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{statusCounts.in_progress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">{statusCounts.new}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;
