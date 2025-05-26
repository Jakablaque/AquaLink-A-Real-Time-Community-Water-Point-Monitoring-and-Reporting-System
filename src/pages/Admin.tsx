
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Droplets, 
  Search,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  Calendar,
  Download,
  Filter,
  Eye,
  Edit
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30");

  // Mock admin data
  const allReports = [
    {
      id: "RPT-001",
      waterSource: "Central Park Well",
      reporter: "John Doe",
      issueType: "No water flow",
      status: "in_progress",
      urgency: "high",
      submittedDate: "2024-01-15T10:30:00Z",
      assignedTo: "Tech Team Alpha",
      location: "Downtown",
      affectedPeople: 150
    },
    {
      id: "RPT-002",
      waterSource: "School Fountain", 
      reporter: "Jane Smith",
      issueType: "Contaminated water",
      status: "resolved",
      urgency: "critical",
      submittedDate: "2024-01-10T08:15:00Z",
      assignedTo: "Health Inspector",
      location: "School District",
      affectedPeople: 300
    },
    {
      id: "RPT-003",
      waterSource: "Market Square Pump",
      reporter: "Bob Wilson",
      issueType: "Low water pressure",
      status: "new",
      urgency: "medium",
      submittedDate: "2024-01-18T16:22:00Z",
      assignedTo: null,
      location: "Market Area",
      affectedPeople: 75
    },
    {
      id: "RPT-004",
      waterSource: "Community Center Tap",
      reporter: "Alice Brown",
      issueType: "Broken pump/tap",
      status: "resolved",
      urgency: "high",
      submittedDate: "2024-01-05T12:10:00Z",
      assignedTo: "Maintenance Team",
      location: "Community Center",
      affectedPeople: 200
    },
    {
      id: "RPT-005",
      waterSource: "Park Well #3",
      reporter: "Mike Johnson",
      issueType: "Strange taste/odor",
      status: "in_progress",
      urgency: "medium",
      submittedDate: "2024-01-12T14:45:00Z",
      assignedTo: "Water Quality Team",
      location: "North Park",
      affectedPeople: 120
    }
  ];

  // Analytics data
  const statusData = [
    { name: 'New', value: allReports.filter(r => r.status === 'new').length, color: '#3b82f6' },
    { name: 'In Progress', value: allReports.filter(r => r.status === 'in_progress').length, color: '#f59e0b' },
    { name: 'Resolved', value: allReports.filter(r => r.status === 'resolved').length, color: '#10b981' },
  ];

  const urgencyData = [
    { name: 'Critical', count: allReports.filter(r => r.urgency === 'critical').length },
    { name: 'High', count: allReports.filter(r => r.urgency === 'high').length },
    { name: 'Medium', count: allReports.filter(r => r.urgency === 'medium').length },
    { name: 'Low', count: allReports.filter(r => r.urgency === 'low').length },
  ];

  const locationData = [
    { name: 'Downtown', reports: 2, resolved: 1 },
    { name: 'School District', reports: 1, resolved: 1 },
    { name: 'Market Area', reports: 1, resolved: 0 },
    { name: 'Community Center', reports: 1, resolved: 1 },
    { name: 'North Park', reports: 1, resolved: 0 },
  ];

  const trendData = [
    { date: 'Week 1', reports: 12, resolved: 8 },
    { date: 'Week 2', reports: 8, resolved: 10 },
    { date: 'Week 3', reports: 15, resolved: 12 },
    { date: 'Week 4', reports: 5, resolved: 7 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'in_progress': return 'secondary';
      case 'resolved': return 'outline';
      default: return 'default';
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

  const handleStatusChange = (reportId: string, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `Report ${reportId} status changed to ${newStatus}`,
    });
  };

  const handleAssignReport = (reportId: string, assignee: string) => {
    toast({
      title: "Report assigned",
      description: `Report ${reportId} assigned to ${assignee}`,
    });
  };

  const filteredReports = allReports.filter(report => {
    const matchesSearch = 
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.waterSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.issueType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalReports: allReports.length,
    newReports: allReports.filter(r => r.status === 'new').length,
    inProgress: allReports.filter(r => r.status === 'in_progress').length,
    resolved: allReports.filter(r => r.status === 'resolved').length,
    totalAffected: allReports.reduce((sum, r) => sum + r.affectedPeople, 0),
    avgResolutionTime: "2.3 days",
    criticalIssues: allReports.filter(r => r.urgency === 'critical').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/map')}>
                <MapPin className="h-4 w-4 mr-2" />
                View Map
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">All Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalReports}</div>
                  <div className="text-xs text-gray-600">Total Reports</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.newReports}</div>
                  <div className="text-xs text-gray-600">New</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                  <div className="text-xs text-gray-600">In Progress</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
                  <div className="text-xs text-gray-600">Resolved</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.totalAffected}</div>
                  <div className="text-xs text-gray-600">People Affected</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.criticalIssues}</div>
                  <div className="text-xs text-gray-600">Critical Issues</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-600">{stats.avgResolutionTime}</div>
                  <div className="text-xs text-gray-600">Avg Resolution</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports Requiring Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allReports.filter(r => r.status === 'new' || r.urgency === 'critical').slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="font-medium">{report.waterSource}</h4>
                          <Badge variant={getStatusColor(report.status)}>
                            {report.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className={`text-sm font-medium ${getUrgencyColor(report.urgency)}`}>
                            {report.urgency.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{report.issueType} - {report.location}</p>
                        <p className="text-xs text-gray-500">Reporter: {report.reporter}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Assign
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reports by ID, location, reporter, or issue type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New Reports</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reports Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Report ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Water Source
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Urgency
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reporter
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {report.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{report.waterSource}</div>
                              <div className="text-sm text-gray-500">{report.location}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.issueType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Select 
                              value={report.status} 
                              onValueChange={(value) => handleStatusChange(report.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${getUrgencyColor(report.urgency)}`}>
                              {report.urgency.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.reporter}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Report Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Urgency Levels */}
              <Card>
                <CardHeader>
                  <CardTitle>Reports by Urgency Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={urgencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Location Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Reports by Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={locationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="reports" fill="#3b82f6" name="Total Reports" />
                      <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="reports" stroke="#3b82f6" name="New Reports" />
                      <Line type="monotone" dataKey="resolved" stroke="#10b981" name="Resolved" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
