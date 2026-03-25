import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    title: {
        template: "%s | sudicodes.xyz",
        default: "sudicodes.xyz",
    },
    description: "Sudipto Islam",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${jetbrainsMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Header />
                {children}
                <Footer />
                <Toaster
                    position="top-right"
                    theme="dark"
                    duration={5000}
                    closeButton
                    richColors
                />
            </body>
        </html>
    );
}
