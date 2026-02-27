import React from "react";
import { SignUp } from "@clerk/clerk-react";

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="w-full bg-[#ff4c3b] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm lg:px-0">
          <span>Register</span>
          <span className="text-xs opacity-90">
            Home <span className="mx-1">–</span> Register
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 flex justify-center">
        <SignUp signInUrl="/login" forceRedirectUrl="/" />
      </div>
    </div>
  );
};

export default Signup;
