import type { Metadata } from "next";
import { Roboto } from "@/app/ui/fonts";
import "./globals.css";
import Navbar from "./ui/shared/Navbar";
import { FaKeyboard } from "react-icons/fa6";
import Footer from "./ui/shared/Footer";
import { SoundProvider } from "@/app/context/typing/SoundContext";

export const metadata: Metadata = {
  title: "TufTyping",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Roboto.className} antialiased flex flex-col min-h-screen`}
      >
        <SoundProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          {/* <Footer /> */}
        </SoundProvider>
      </body>
    </html>
  );
}
