"use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";

// interface ProtectedProps {
//   children: React.ReactNode;
// }

// export default function Protected({ children }: ProtectedProps) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === "loading") {
//     return <div>Loading...</div>; // Show a loader while checking session
//   }

//   if (!session) {
//     // Redirect to login page if not authenticated
//     router.push("/login");
//     return null;
//   }

//   return <>{children}</>; // Render the protected content
// }
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Correct import for App Router

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    // Show a loading state while checking session
    return <div>Loading...</div>;
  }

  console.log(session, status)
  
  if (!session) {
    // Redirect to login page if not authenticated
    router.push("/main/login");
    return null;
  }

  // Render protected content for authenticated users
  return <>{children}</>;
}