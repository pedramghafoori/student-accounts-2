export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  // Check cookie
  const cookieStore = cookies()
  const userToken = cookieStore.get('userToken')?.value

  // If no token, redirect to login
  if (!userToken) {
    redirect('/login?reason=inactive')
  }

  // If token is valid, you could fetch user data from /api/auth/me or show your “mobile-first” UI
  // For example:
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/me`, {
    headers: { Cookie: `userToken=${userToken}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    // token might be invalid
    redirect('/login?reason=invalid')
  }

  const { user } = await res.json() // e.g. { user: { name: ..., ... } }

  // Return your new UI
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">Welcome, {user?.name ?? 'User'}</h1>
      </header>

      <main className="flex-1 p-4">
        <p>Show your dashboard content here.</p>
      </main>

      <nav className="bg-blue-900 text-white flex justify-around py-3">
        <Link href="/" className="flex flex-col items-center hover:bg-blue-800 px-3 py-1 rounded">
          <span className="material-icons text-xl">home</span>
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center hover:bg-blue-800 px-3 py-1 rounded">
          <span className="material-icons text-xl">assignment_ind</span>
          <span className="text-xs">Account</span>
        </Link>
        <Link href="/courses" className="flex flex-col items-center hover:bg-blue-800 px-3 py-1 rounded">
          <span className="material-icons text-xl">assignment</span>
          <span className="text-xs">Courses</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center hover:bg-blue-800 px-3 py-1 rounded">
          <span className="material-icons text-xl">settings</span>
          <span className="text-xs">Settings</span>
        </Link>
      </nav>
    </div>
  )
}