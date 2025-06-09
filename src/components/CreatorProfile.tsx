
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Linkedin, Github } from 'lucide-react';

interface CreatorProfileProps {
  isLogin: boolean;
}

const CreatorProfile: React.FC<CreatorProfileProps> = ({ isLogin }) => {
  return (
    <>
      {/* Mobile Creator Profile */}
      <div className="mb-6 lg:mb-0 lg:hidden">
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/1924f3aa-cbeb-4ea7-a1d1-4b4cd89d3168.png" 
                alt="Ngoma Benjamin - Creator"
                className="w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-purple-500 to-blue-500"
              />
              <div className="flex-1">
                <h3 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Ngoma Benjamin
                </h3>
                <p className="text-xs text-muted-foreground">Creator & Developer</p>
                <div className="flex space-x-2 mt-2">
                  <a 
                    href="https://www.instagram.com/ngoma.301/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:scale-110 transition-transform duration-200"
                  >
                    <Instagram className="w-3 h-3" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ngoma-benjamin-408483336/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:scale-110 transition-transform duration-200"
                  >
                    <Linkedin className="w-3 h-3" />
                  </a>
                  <a 
                    href="https://github.com/ngoma301" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:scale-110 transition-transform duration-200"
                  >
                    <Github className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Creator Profile */}
      <div className="hidden lg:flex flex-col items-center space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-0 max-w-sm">
        <div className="text-center">
          <img 
            src="/lovable-uploads/1924f3aa-cbeb-4ea7-a1d1-4b4cd89d3168.png" 
            alt="Ngoma Benjamin - Creator"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-gradient-to-r from-purple-500 to-blue-500 shadow-lg"
          />
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Ngoma Benjamin
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Creator & Developer</p>
        </div>
        
        <div className="text-center space-y-3">
          <h4 className="font-semibold text-foreground">Professional Authentication System</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is a secure authentication platform with session management, 
            remote logout capabilities, and professional-grade security features. 
            Built with modern technologies and best practices.
          </p>
        </div>

        <div className="flex space-x-4">
          <a 
            href="https://www.instagram.com/ngoma.301/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:scale-110 transition-transform duration-200"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/ngoma-benjamin-408483336/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:scale-110 transition-transform duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://github.com/ngoma301" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:scale-110 transition-transform duration-200"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        {!isLogin && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              Sign up now to experience secure authentication with advanced session management!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatorProfile;
