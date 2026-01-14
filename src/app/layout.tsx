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
      <body className="flex flex-col justify-between min-h-screen">
        <AuthProvider>
          <UserProvider>
            <Header />
            <div className="w-full px-12 pb-10">
              {children}
            </div>
          </UserProvider>
        </AuthProvider>
        <p className="">Thank you for visiting UCD Project Bulletin</p>
      </body>
    </html>
  );
}
