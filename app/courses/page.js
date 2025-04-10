// student-accounts-mobile/app/courses/page.js
import React from 'react'
import Link from 'next/link'
import { getSession } from '../../lib/session'
import { getAllCourses } from '../../lib/courses' // if you had a function

export default async function CoursesPage() {
  const session = await getSession()
  const courses = await getAllCourses() // or however you previously got them

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">Courses</h1>
      </header>

      <main className="flex-1 p-4">
        {/* List all courses, same logic as old page */}
        {courses.map(course => (
          <div key={course._id} className="bg-white p-2 mb-2 rounded shadow">
            <h3 className="font-bold">{course.title}</h3>
            <p className="text-gray-600">{course.dateRange}</p>
          </div>
        ))}
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
          <span className="material-icons text-xl">school</span>
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