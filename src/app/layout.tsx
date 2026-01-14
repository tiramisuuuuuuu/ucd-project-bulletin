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
      <body>
        <AuthProvider>
          <UserProvider>
            <div className="flex flex-col justify-between min-h-screen">
              <div>
                <Header />
                <div className="w-full px-12 pb-10">
                  {children}
                </div>
              </div>
              <p className="">Thank you for visiting UCD Project Bulletin</p>
            </div>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
