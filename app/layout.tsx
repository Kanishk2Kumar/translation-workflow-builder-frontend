import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Noto_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Translatio",
  description: "Voice AI Assistant Specialized for HealthCare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${notoSans.variable} antialiased`}
      >
        <div>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Translatio - Healthcare Automation</title>

        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

        {/* Theme Configuration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                  darkMode: "className",
                  theme: {
                      extend: {
                          colors: {
                              "primary": "#13ec5b",
                              "primary-hover": "#0fb845",
                              "background-light": "#f6f8f6",
                              "background-dark": "#111813",
                              "card-dark": "#1c271f",
                              "border-dark": "#28392e",
                              "text-muted": "#9db9a6",
                          },
                          fontFamily: {
                              "display": ["Manrope", "sans-serif"],
                              "body": ["Noto Sans", "sans-serif"]
                          },
                          borderRadius: {
                              "DEFAULT": "0.25rem",
                              "lg": "0.5rem",
                              "xl": "0.75rem",
                              "full": "9999px"
                          },
                      },
                  },
              }
            `,
          }}
        />

        {/* Fonts */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Noto+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* Material Icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .glass-panel {
                  background: rgba(28, 39, 31, 0.7);
                  backdrop-filter: blur(12px);
                  -webkit-backdrop-filter: blur(12px);
                  border: 1px solid rgba(19, 236, 91, 0.1);
              }
              
              /* Smooth scrolling */
              html {
                  scroll-behavior: smooth;
              }
            `,
          }}
        />
      </div>
        {children}
      </body>
    </html>
  );
}