import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader, ImageIcon, Eye, EyeOff, Instagram, Linkedin, Github } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    identifier: '',
    email: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.identifier, formData.password);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      } else {
        if (!profileImage) {
          toast({
            title: "Profile image required",
            description: "Please select a profile image.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        await register(formData.email, formData.username, formData.password, profileImage);
        toast({
          title: "Account created!",
          description: "Welcome to our platform.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-4">
      <div className="w-full max-w-6xl">
        {/* Creator Profile Section - Now responsive */}
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

        <div className="flex gap-8 items-center">
          {/* Creator Profile Section - Desktop */}
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

          {/* Auth Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 animate-fade-in">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4 animate-scale-in">
                  <span className="text-white text-2xl font-bold">A</span>
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {isLogin 
                    ? 'Sign in to your secure account' 
                    : 'Join our secure authentication platform'
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                          {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">Upload profile picture</p>
                    </div>
                  )}

                  {isLogin ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="identifier">Email or Username</Label>
                        <Input
                          id="identifier"
                          name="identifier"
                          type="text"
                          value={formData.identifier}
                          onChange={handleInputChange}
                          placeholder="Enter your email or username"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Choose a username"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                      </div>
                    ) : (
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-primary hover:underline font-medium"
                      disabled={loading}
                    >
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
