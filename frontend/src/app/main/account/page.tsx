"use client";
import Account from "@/components/LoginAndSignup/Account";
import Protected from "@/components/protected/protected";

export default function AccountPage() {
  return (
    <Protected>
     <div className=" h-full w-full">
      <Account />
     </div>
    </Protected>
  )
}

// "use client";
// import Account from "@/components/LoginAndSignup/Account";
// export default function AccountPage() {
//   return (
//     <div className=" h-full w-full">
//       <Account />
//     </div>
//   )
// }