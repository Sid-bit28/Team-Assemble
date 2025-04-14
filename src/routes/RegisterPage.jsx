import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center pt-6">
      <SignUp signInUrl="/login" />
    </div>
  );
};

export default RegisterPage;
