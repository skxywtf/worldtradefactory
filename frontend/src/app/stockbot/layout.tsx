import React from 'react';
import HeaderLand from "../../components/landing page/header footer landing/HeaderLand";
import Protected from '@/components/protected/protected';

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <Protected>
    <div className="relative flex flex-col h-screen overflow-hidden bg-gray-200" >
  
      <HeaderLand />
      {children}
      
    </div>
    </Protected>
  )}    