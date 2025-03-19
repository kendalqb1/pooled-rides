import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Ajusta los pesos según tus necesidades
});

export const metadata = {
  title: "PooledRides",
  description: "App para transportes de empresas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${poppins.variable} antialiased`}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
