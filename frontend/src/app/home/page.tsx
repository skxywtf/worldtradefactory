"use client";
import { SetStateAction, useState } from "react";
import LandingPage from "@/components/landing page/LandingPage";
import { useTheme } from 'next-themes'

export default function Home() {
  const { theme  } = useTheme();
  return (
    <main>
     <LandingPage />
    </main>
  );
}