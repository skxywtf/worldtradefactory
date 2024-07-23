"use client";
import { SetStateAction, useState } from "react";
import LandingPage from "../components/landing page/LandingPage";
export default function Home() {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (input: SetStateAction<string>) => {
    setSearchInput(input);
  };
  const [theme, setTheme] = useState("light");

  const handleTheme = (color: SetStateAction<string>) => {
    setTheme(color);
  };

  return (
    <main>
     <LandingPage />
    </main>
  );
}
