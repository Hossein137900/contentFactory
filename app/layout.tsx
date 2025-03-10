import type { Metadata } from "next";
import "./globals.css";
import { sahel } from "@/next-persian-fonts/sahel";
import Navbar from "@/components/global/navabr";
import Footer from "@/components/global/footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sahel.className} antialiased relative`}>
        <div className="relative">
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
