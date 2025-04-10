// app/layout.js
import './globals.css';
import React from "react";
import FooterMenu from "../components/FooterMenu";

export const metadata = {
  title: 'Self-Serve Portal',
  description: 'Automate refunds and rescheduling',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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