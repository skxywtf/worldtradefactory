"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname()
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const user = localStorage.getItem("user");
  const clientUsername = localStorage.getItem("clientUsername");
  // const clearPathName = () => sessionStorage.removeItem('currentPath');

  // console.log(session, status)
  // localStorage.removeItem('clientUsername');
  // localStorage.removeItem('user');

  // console.log(JSON.parse(user));
  sessionStorage.setItem('currentPath',pathname);
  // console.log(pathname)
  
  if (!clientUsername && !user) {
    // Redirect to login page if not authenticated
    router.push("/main/login");
    return null;
  }

  return <>{children}</>;
}