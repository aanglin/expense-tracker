import "./globals.css";
import { Inter } from "next/font/google";

import NavBar from "@/components/NavBar";
import StateHelperProvider from "@/lib/store/stateHelper";
import AuthContextProvider from "@/lib/store/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker",
  description: "Created by Aaron A.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <StateHelperProvider>
            <NavBar />
            {children}
          </StateHelperProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
