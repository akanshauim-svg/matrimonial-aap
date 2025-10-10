import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./globals.css";
import { UserProvider } from "../context/UserContext";

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
