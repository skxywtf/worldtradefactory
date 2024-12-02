 import React from 'react';
import HeaderLand from "../../components/landing page/header footer landing/HeaderLand";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-gray-200" >
  
      <HeaderLand />
      {children}
      
    </div>
  )}    