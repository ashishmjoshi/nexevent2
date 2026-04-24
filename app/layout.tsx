import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "NexEvent | Campus Ecosystem",
  description: "Centralized campus ecosystem bridging the gap between student engagement and administrative management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased dark`}>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        {children}
      </body>
    </html>
  );
}
