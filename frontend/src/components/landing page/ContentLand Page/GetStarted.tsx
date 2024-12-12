import Link from "next/link";
import { useTheme } from "next-themes";

const GetStarted = () => {
  const { theme } = useTheme();

  return (
    <div className="mb-10 h-full w-full">
      <div className=" h-full w-full">
        <div
          className={`text-3xl w-full flex justify-center pt-10 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          <div className="mt-8 text-blue-600">Ready to Explore our Website</div>
        </div>

        <div className=" w-full flex justify-center pt-10">
          <Link
            href="/main/login"
            className={`text-2xl p-1 py-2 px-3 rounded-md ${
              theme === "light" ? "text-black" : "text-white"
            } border border-white bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800`}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

