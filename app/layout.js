// app/layout.js

import './globals.css'
import { Roboto } from 'next/font/google' // just an example font

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata = {
  title: 'Student Accounts',
  description: 'Mobile-first redesign for student accounts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* If you want Material Icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={`${roboto.className} bg-gray-50 text-gray-900 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}