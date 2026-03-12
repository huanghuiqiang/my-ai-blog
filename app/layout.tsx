import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finn 的 AI 学习博客",
  description: "探索 AI 时代的软件架构、工程实践与思维升级",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${notoSans.variable} ${notoSerif.variable} bg-[var(--surface)] text-[var(--text-primary)] antialiased relative min-h-screen selection:bg-[var(--brand)]/30 selection:text-[var(--text-primary)]`}>
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.16),transparent_35%),radial-gradient(circle_at_78%_2%,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_68%_82%,rgba(251,191,36,0.15),transparent_28%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_78%_2%,rgba(74,222,128,0.11),transparent_30%),radial-gradient(circle_at_68%_82%,rgba(251,191,36,0.10),transparent_28%)]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] dark:opacity-[0.06]" />
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
