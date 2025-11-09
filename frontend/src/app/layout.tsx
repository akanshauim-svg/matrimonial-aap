import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserProvider } from "../context/UserContext";

export const metadata = {
  title: "Matrimonial App",
  description: "Find your perfect match",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <UserProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
