import UserProvider from "@/components/UserProvider";
import "./globals.css";

import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "My App",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <UserProvider>
            <Header />
            {children}
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
