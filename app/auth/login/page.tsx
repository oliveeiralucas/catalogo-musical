"use client";
import React, { Suspense } from "react";
// import { LoginForm } from "@root/components/auth/login-form";

const Login: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>{/* <LoginForm /> */}</Suspense>
  );
};

export default Login;
