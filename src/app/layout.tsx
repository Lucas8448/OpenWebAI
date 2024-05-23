import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AuthWrapper from "@/components/AuthWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenWebAI",
  description: "The platform for running whatever LLM you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <AuthWrapper>
          <body className={inter.className}>{children}</body>
        </AuthWrapper>
      </UserProvider>
    </html>
  );
}
