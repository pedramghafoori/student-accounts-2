// app/layout.js
import '../app/globals.css';
import React from "react";
import FooterMenu from "../components/FooterMenu";
import Header from "../components/Header";
import AppProvider from "../context/AppContext";

export const metadata = {
  title: 'Self-Serve Portal',
  description: 'Automate refunds and rescheduling',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
      <AppProvider>
      <Header />
        <div className="min-h-screen flex flex-col">
          {/* Main content */}
          <main className="flex-1">{children}</main>
          {/* Footer menu at the bottom */}
          <FooterMenu />
        </div>
        </AppProvider>
      </body>
    </html>
  );
}