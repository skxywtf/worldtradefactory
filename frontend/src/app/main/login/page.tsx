"use client";
import Login from "@/components/LoginAndSignup/Login";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";

export default function LoginPage() {
  return (
    <div className="h-full w-full">
      
      <Login />
      <FooterLand />

    </div>
  )
}