
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Droplets, AlertTriangle, CheckCircle, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock data for dashboard overview
  const stats = {
    totalSources: 247,
    activeSources: 189,
    reportedIssues: 23,
    resolvedIssues: 156
  };

  const recentReports = [
    { id: 1, location: "Downtown Well #3", status: "new", time: "2 hours ago" },
    { id: 2, location: "Central Park Fountain", status: "in_progress", time: "5 hours ago" },
    { id: 3, location: "Community Center Tap", status: "resolved", time: "1 day ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'destructive';
      case 'in_progress': return 'default';
      case 'resolved': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'New Issue';
      case 'in_progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AquaLink</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Button variant="outline" onClick={() => navigate('/map')}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Map View
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/report')}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report Issue
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/my-reports')}>
                    My Reports
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/admin')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                  <Button variant="secondary" onClick={() => setIsAuthenticated(false)}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button onClick={() => navigate('/signup')}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Clean Water Access Monitoring
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help communities report water source issues and track their resolution. 
            Together, we can ensure everyone has access to clean, safe water.
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/map')}>
            <CardHeader className="text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Find Water Sources</CardTitle>
              <CardDescription>
                Locate nearby water sources and check their current status
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/report')}>
            <CardHeader className="text-center">
              <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-2" />
              <CardTitle>Report an Issue</CardTitle>
              <CardDescription>
                Submit reports about water source problems in your community
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/my-reports')}>
            <CardHeader className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Track Progress</CardTitle>
              <CardDescription>
                Monitor the status of your reports and see resolution progress
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalSources}</div>
              <div className="text-sm text-gray-600">Total Sources</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.activeSources}</div>
              <div className="text-sm text-gray-600">Active Sources</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.reportedIssues}</div>
              <div className="text-sm text-gray-600">Open Issues</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.resolvedIssues}</div>
              <div className="text-sm text-gray-600">Resolved Issues</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Recent Community Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="font-medium">{report.location}</div>
                      <div className="text-sm text-gray-600">{report.time}</div>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(report.status)}>
                    {getStatusText(report.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Login */}
        {!isAuthenticated && (
          <div className="mt-8 text-center">
            <Button 
              onClick={() => setIsAuthenticated(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Demo (Login as User)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
