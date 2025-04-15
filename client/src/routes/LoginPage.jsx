import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center pt-6">
      <SignIn signUpUrl="/register" />
    </div>
  );
};

export default LoginPage;
