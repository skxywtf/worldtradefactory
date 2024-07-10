import { Route, Routes } from "react-router-dom";
import Subscription from "./components/header and Footer/Subscription";
import Terms from "./components/header and Footer/Terms";
import About from "./components/header and Footer/About";
import Signup from "./components/LoginAndSignup/Signup";
import Login from "./components/LoginAndSignup/Login";
import Contact from "./components/header and Footer/Contact";
import Stock from "./components/Stock Page/Stock";
import Main from "./components/Mian Page/Main";
import Account from "./components/LoginAndSignup/Account";
import { useState } from "react";
import LandingPage from "./components/landing page/LandingPage";

// rgb(2, 2, 2)
function App() {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (input) => {
    setSearchInput(input);
  };
  const [theme, setTheme] = useState("light");

  const handleTheme = (color) => {
    setTheme(color);
  };

  return (
    // bg-[rgb(19,19,19)]  bg-[#06081e]  bg-[rgb(15,23,42)]  bg-[#03121f]  bg-[#020e18]
    <div
      className={` dark:bg-white dark:text-black bg-[#0c101e] text-gray-200 h-full w-full  font-mono `}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Main
              onSearchSubmit={handleSearchSubmit}
              onThemeChange={handleTheme}
              searchInput={searchInput}
            />
          }
        ></Route>
        <Route
          path="/stock"
          element={
            <Stock
              searchInput={searchInput}
              onThemeChange={handleTheme}
              theme={theme}
            />
          }
        ></Route>
        <Route path="/subscription" element={<Subscription />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/landing" element={<LandingPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
