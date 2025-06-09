
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Monitor, Smartphone, Tablet, MapPin, Calendar, Shield, LogOut } from 'lucide-react';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

interface Session {
  _id: string;
  userAgent: string;
  ipAddress: string;
  location: string;
  createdAt: string;
  active: boolean;
}

const SessionsManager = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      const data = await authService.getSessions();
      setSessions(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch sessions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleLogoutSession = async (sessionId: string) => {
    setLogoutLoading(sessionId);
    try {
      await authService.logoutSession(sessionId);
      setSessions(sessions.filter(s => s._id !== sessionId));
      toast({
        title: "Session terminated",
        description: "The session has been successfully terminated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to terminate session",
        variant: "destructive",
      });
    } finally {
      setLogoutLoading(null);
    }
  };

  const getDeviceIcon = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      return <Smartphone className="w-5 h-5" />;
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      return <Tablet className="w-5 h-5" />;
    }
    return <Monitor className="w-5 h-5" />;
  };

  const getDeviceColor = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      return 'text-green-500';
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      return 'text-purple-500';
    }
    return 'text-blue-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span>Active Sessions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <span>Active Sessions</span>
        </CardTitle>
        <CardDescription>
          Manage your active sessions across different devices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No active sessions found</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session._id}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full bg-white shadow-sm ${getDeviceColor(session.userAgent)}`}>
                    {getDeviceIcon(session.userAgent)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {session.userAgent.includes('Chrome') && 'Chrome'}
                        {session.userAgent.includes('Firefox') && 'Firefox'}
                        {session.userAgent.includes('Safari') && !session.userAgent.includes('Chrome') && 'Safari'}
                        {session.userAgent.includes('Edge') && 'Edge'}
                        {!session.userAgent.match(/(Chrome|Firefox|Safari|Edge)/) && 'Unknown Browser'}
                      </h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{session.location || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(session.createdAt)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      IP: {session.ipAddress}
                    </div>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                      disabled={logoutLoading === session._id}
                    >
                      {logoutLoading === session._id ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center space-x-2">
                        <div className="p-2 rounded-full bg-red-100">
                          <LogOut className="w-5 h-5 text-red-600" />
                        </div>
                        <span>Terminate Session</span>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to terminate this session? This will log out the device and require re-authentication.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleLogoutSession(session._id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Terminate Session
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionsManager;
