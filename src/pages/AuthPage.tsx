
import React, { useState } from 'react';
import CreatorProfile from '@/components/CreatorProfile';
import AuthForm from '@/components/AuthForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-4">
      <div className="w-full max-w-6xl">
        <CreatorProfile isLogin={isLogin} />

        <div className="flex gap-8 items-center">
          <CreatorProfile isLogin={isLogin} />
          <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
