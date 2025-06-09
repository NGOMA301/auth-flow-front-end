
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader, ImageIcon, Settings, User, Mail } from 'lucide-react';
import { authService } from '@/services/authService';

const ProfileUpdateModal = () => {
  const { user, checkAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    username: user?.username || '',
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
      await authService.updateProfile(
        formData.email !== user?.email ? formData.email : undefined,
        formData.username !== user?.username ? formData.username : undefined,
        profileImage || undefined
      );
      
      await checkAuth(); // Refresh user data
      
      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      });
      
      setIsOpen(false);
      setProfileImage(null);
      setPreviewUrl('');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: user?.email || '',
      username: user?.username || '',
    });
    setProfileImage(null);
    setPreviewUrl('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-purple-500" />
            <span>Update Profile</span>
          </DialogTitle>
          <DialogDescription>
            Update your profile information and picture.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage 
                  src={previewUrl || user?.profileImageUrl} 
                  alt={user?.username} 
                  className="object-cover"
                />
                <AvatarFallback className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  {user?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border-2 border-gray-100">
                <ImageIcon className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Click to change profile picture</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Username</span>
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Label>
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
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                <span>Update Profile</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateModal;
