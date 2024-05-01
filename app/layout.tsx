import type { Metadata } from "next";
import { Roboto } from "@/app/ui/fonts";
import "./globals.css";
import Navbar from "./ui/shared/Navbar";
import Footer from "./ui/shared/Footer";
import { SoundProvider } from "@/app/context/typing/SoundContext";
import AuthProvider from "./context/AuthProvider";

export const metadata: Metadata = {
  title: {
    default:
      "TypingBattle.com - Improve Your Typing Speed and Earn Cash Prizes and Exciting Rewards",
    template: "%s - TypingBattle.com",
  },
  description:
    "TypingBattle.com helps you practice typing speed and compete for cash prizes. It offers numerous features, including leaderboards, score saving, and customizable typing times, all designed to improve your typing skills and boost your chances of winning cash prizes and rewards.",
  keywords: [
    "typing battle",
    "typing speed test",
    "typing jobs",
    "typing speed practice",
    "typing speed",
    "wpm",
    "wpm speed",
    "typing and earn money",
    "online typing jobs",
    "typing job",
    "typing speed game",
    "earn money by typing",
    "make money online by typing",
    "typingbattle",
    "TypingBattle.com",
    "typingbattle",
    "typingbattle.com",
    "touch typing",
    "earn money by playing games",
    "earning money by typing",
    "typing test",
    "typingspeed",
  ],
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
};
//
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
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
