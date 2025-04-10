// pages/home/page.js
import React from 'react';
import Layout from '../../components/Layout';

const courses = [
  { name: 'National Lifeguard', startDate: 'Mar 7', endDate: 'Mar 15' }
  // Add more courses as needed
];

const HomePage = () => {
  // Sample data—you can replace these with props or API-fetched data.
  const headerTitle = 'Student Account';
  const currentAccountName = 'John Doe';
  const allUserAccounts = [
    { id: 1, displayName: 'John Doe' },
    { id: 2, displayName: 'My Other Account' },
    { id: 3, displayName: 'Test Account' }
  ];

  return (
    <Layout headerTitle={headerTitle} currentAccountName={currentAccountName} allUserAccounts={allUserAccounts}>
      <h2 className="text-xl font-semibold mb-4">Recent and Upcoming Courses</h2>
      <div className="space-y-4">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="flex items-center justify-between bg-white shadow-sm rounded p-4">
              <div>
                <p className="font-semibold">{course.name}</p>
                <p className="text-sm text-gray-500">
                  {course.startDate} – {course.endDate}
                </p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No courses found.</p>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;