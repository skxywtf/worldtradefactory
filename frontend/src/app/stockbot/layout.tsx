// 'use client'
// interface ChatLayoutProps {
//     children: React.ReactNode
//   }
  
//   export default async function ChatLayout({ children }: ChatLayoutProps) {
//     return (
//       <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
//         {children}
//         </div>
//     )
//   }
  
import React from 'react';
import Header from '../../components/Stock Page/Header';  // Adjust path to where Header.tsx is located

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-gray-200" >
  
      <Header />
      {children}
      
    </div>
  )}    