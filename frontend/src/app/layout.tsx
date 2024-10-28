import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils'
// import { ThemeToggle } from '@/components/theme-toggle'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { Tooltip } from '@radix-ui/react-tooltip'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { ThemeProvider } from "@/context/theme-provider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Skxywtf",
// };

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: "Skxywtf",
  // {
  //   default: 'StockBot powered by Groq',
  //   template: `%s - StockBot powered by Groq`
  // },
  description:
    'Lightning Fast AI Chatbot that Responds With Live Interactive Stock Charts, Financials, News, Screeners, and More.',
  icons: {
    icon: '/favicon.ico',
    // shortcut: '/favicon-16x16.png',
    // apple: '/apple-touch-icon.png'
  }
}

// export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >
      <body
        // className={cn(
        //   'font-sans antialiased',
        //   GeistSans.variable,
        //   GeistMono.variable
        // )}
      >
        {/* <Toaster position="top-center" /> */}
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* <div className="flex flex-col"> */}
            <body className={inter.className} >{children}</body>
          {/* </div> */}
          {/* <ThemeToggle /> */}
        </Providers>
      </body>
    </html>
  )
}


      // <ThemeProvider
      //       attribute="class"
      //       defaultTheme="system"
      //       enableSystem
      //       disableTransitionOnChange
      //     >
      //       {children}
      //     </ThemeProvider>