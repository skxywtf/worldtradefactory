import { FormEvent, useEffect, useState } from "react";
import Logo from "../../assets/skxywtfLogo.jpeg"
import Image from "next/image";
import { useRouter } from "next/navigation";

export const HomeHeader = () => {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleScroll = () => {
    if (window.scrollY > 20) {
        setIsScrolled(true);
    } else {
        setIsScrolled(false);
    }
  };

  useEffect(() => {
  window.addEventListener('scroll', handleScroll);

  return () => {
      window.removeEventListener('scroll', handleScroll);
  };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("searchInput", searchInput);
    router.push("/main/stock");
  };

    return(
      <div className={`w-full h-20 fixed transition-all duration-300 ease-in-out ${isScrolled ? 'bg-black bg-opacity-100' : ''}`}>
      <div className="h-full flex items-center justify-between px-10 w-full">
        {/* logo */}
        <div className="w-48">
          <Image
            className="cursor-pointer rounded"
            // onClick={() => router.push("/")}
            src={Logo}
            alt="Logo"
          />
        </div>
        {/* middle parameters */}
        <div className="hidden md:flex gap-7 text-white font-bold">
          <button
            className="p-1 px-3 text-lg hover:bg-neutral-600 rounded-full"
            onClick={() => router.push("/main/stock")}
          >
            Stocks
          </button>
          <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full" onClick={() => router.push("/screener")}>
            Screener
          </button>
          <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full" onClick={() => router.push("/forex")}>
            Forex
          </button>
          <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full" onClick={() => router.push("/crypto")}>
            Crypto
          </button>
          <button onClick={() => router.push("/stockbot")}
          className="p-1 px-3 text-lg text-black bg-gray-300 rounded-full hover:text-slate-600">
           Try New StockBot
          </button>
        </div>
        {/* search bar */}
        <div>
          <form onSubmit={handleSubmit} className="h-full items-center">
            <input
              type="text"
              placeholder="Search Stocks..."
              className="h-8 bg-neutral-800 focus:outline-none focus:border-transparent rounded-full px-3 text-white"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
        
      </div>
    </div>
    )
}