import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col gap-14 bg-[#fafafa] text-slate-800">
      {/* Red banner / breadcrumb */}
      <div className="w-full bg-[#ff4c3b] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm lg:px-0">
          <span>Login</span>
          <span className="text-xs opacity-90">
            Home <span className="mx-1">–</span> Login
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex justify-center">
        <SignIn signUpUrl="/signup" forceRedirectUrl="/" />
      </div>
    </div>
  );
};

export default Login;
