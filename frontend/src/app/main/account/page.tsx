"use client";
import Protected from "@/components/protected/protected";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";

export default function AccountPage() {

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;

  const simplifyDate = (data: string | number | Date) => {
  const date = new Date(data);
  const formattedDate = date.toLocaleString();
  return formattedDate
  }

  return (
    <Protected>
     {/* <div className="h-full w-full"> */}
     <HeaderLand />
     <div className="p-10 bg-slate-200 md:h-screen dark:bg-gradient-to-br from-gray-600 to-black" >
      <h2 className="text-2xl py-4" > Your Account </h2>
      <img className="rounded-full p-4" src={user?.photoURL} alt="userProfile" />
      <h3 className="text-xl font-semibold" > {user?.displayName} </h3>
      <h3 className="py-1">Email- {user?.email} {user?.emailVerified ? <span className="text-xs text-green-600">Email Verfied ✅</span> : <p className="text-xs text-red-600">Email not verified ❌</p>} </h3>
      <h3>Unique Id- {user?.uid} <span className="text-slate-600 font-medium">⚠️Keep it confidential</span> </h3>

      <div className="my-4">
      <h3>Acoount Created- {simplifyDate(Number(user?.createdAt))} </h3>
      <h3>Last Login- {simplifyDate(Number(user?.lastLoginAt))} </h3>
      </div>

     </div>
    </Protected>
  )
}