import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import HeaderAuth from "@/components/header-auth";
import { EnvVarWarning } from "@/components/env-var-warning";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Patient Portal",
  description: "Modern onboarding and survey portal for patients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50"}>
        {/* <EnvVarWarning /> */}
        <header className="w-full py-5 px-2 md:px-8 flex items-center gap-4 shadow-sm bg-white/80 border-b border-blue-100 sticky top-0 z-40">
          <Link href="/" className="font-bold text-xl text-blue-800 tracking-tight hover:text-blue-600 transition select-none">
            Patient Portal
          </Link>
          <nav className="flex-1 flex gap-4 items-center ml-6">
            <Link
              href="/onboarding"
              className="px-3 py-1 rounded-lg font-medium text-blue-700 hover:bg-blue-50 transition"
            >
              Onboarding
            </Link>
            <Link
              href="/survey"
              className="px-3 py-1 rounded-lg font-medium text-teal-700 hover:bg-teal-50 transition"
            >
              Survey
            </Link>
          </nav>
          <div className="flex items-center gap-2 ml-auto">
            <ThemeSwitcher />
            <HeaderAuth />
          </div>
        </header>
        <main className="w-full min-h-[calc(100vh-60px)] flex flex-col">{children}</main>
      </body>
    </html>
  );
}