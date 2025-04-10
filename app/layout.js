// app/layout.js
import '../app/globals.css';
import React from "react";
import FooterMenu from "../components/FooterMenu";
import Header from "../components/Header";

export const metadata = {
  title: 'Self-Serve Portal',
  description: 'Automate refunds and rescheduling',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
      <Header />
        <div className="min-h-screen flex flex-col">
          {/* Main content */}
          <main className="flex-1">{children}</main>
          {/* Footer menu at the bottom */}
          <FooterMenu />
        </div>
      </body>
    </html>
  );
}