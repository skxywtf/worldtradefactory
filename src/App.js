import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Stock from "./components/Stock";
import Subscription from "./components/Subscription";
import Terms from "./components/Terms";
import About from "./components/About";
import Footer from "./components/Footer";
import Signup from "./components/Signup";

// rgb(2, 2, 2)
function App() {
  return (
    // bg-[rgb(19,19,19)]  bg-[#06081e]  bg-[rgb(15,23,42)]  bg-[#03121f]  bg-[#020e18]
    <div className={`  bg-[rgb(15,15,15)]  h-full w-full  text-white`}>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/stock" element={<Stock />}></Route>
        <Route path="/subscription" element={<Subscription />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
