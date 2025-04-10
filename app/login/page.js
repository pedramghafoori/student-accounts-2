// student-accounts-mobile/app/login/page.js
'use client' // if you need client-side form handling, useEffect, etc.
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      if (res.status === 200) {
        // redirect or update some auth context
        window.location.href = '/'
      }
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">Login</h1>
      </header>
      
      <main className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p className="text-red-500 mb-2">{error}</p>}
          
          <button className="bg-blue-500 text-white rounded px-4 py-2 w-full" type="submit">
            Log In
          </button>
        </form>
      </main>
      
      <nav className="bg-blue-900 text-white flex justify-around py-3">
        {/* You can omit certain nav items if user isn't logged in, or just show them. */}
        <Link href="/" className="flex flex-col items-center hover:bg-blue-800 px-3 py-1 rounded">
          <span className="material-icons text-xl">home</span>
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/login" className="flex flex-col items-center hover:bg-blue-800 px-3 py-1 rounded">
          <span className="material-icons text-xl">login</span>
          <span className="text-xs">Login</span>
        </Link>
      </nav>
    </div>
  )
}