import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/provider/AuthProvider";
import { NavMenu } from "@/components/menu/nav-menu";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
  display: "swap", // Controls font display behavior
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={cn("flex justify-between flex-col", poppins.className)}
        >
          <div>
            <NavMenu />
            {children}
          </div>
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </AuthProvider>
  );
}
