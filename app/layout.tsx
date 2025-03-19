import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: " Karanrajsinh Vaghela - Front-End Developer",
  description: "Front-end developer specializing in React.js, Next.js, and modern web technologies.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-background text-foreground relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Grid Background with Shadow Overlay */}
          <div className="fixed inset-0 pointer-events-none">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 grid-pattern"
            />
            {/* Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background dark:block hidden" />
          </div>

          <div className="relative">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}