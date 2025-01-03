import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/providers'
import SessionProviderWrapper from "./sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: "Skxywtf",
  description:
    'Lightning Fast AI Chatbot that Responds With Live Interactive Stock Charts, Financials, News, Screeners, and More.',
  icons: {
    icon: '/favicon.ico',
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >
      <body>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange >
          <body className={inter.className} >
            <SessionProviderWrapper>
              {children}
            </SessionProviderWrapper>
          </body>
        </Providers>
      </body>
    </html>
  )
}