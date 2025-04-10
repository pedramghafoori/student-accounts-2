// components/Footer.js
import React from 'react';

const Footer = ({ allUserAccounts }) => {
  return (
    <nav className="bg-white border-t border-gray-200 shadow fixed bottom-0 inset-x-0 md:static md:shadow-none md:border-none md:mt-8">
      <div className="flex justify-around md:justify-center">
        {/* Home button */}
        <a href="/home" className="flex flex-col items-center p-2 hover:bg-gray-100 md:flex-row md:mx-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.75L12 4.5l9 5.25M4.5 10.5v9.75a.75.75 0 00.75.75h4.5a.75.75 
                 0 00.75-.75v-4.5a.75.75 0 01.75-.75h1.5a.75.75 0 
                 01.75.75v4.5a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V10.5M21 
                 10.5l-9-5.25-9 5.25"
            />
          </svg>
          <span className="text-sm md:text-base">Home</span>
        </a>
        {/* Accounts button with hover dropdown */}
        <div className="relative group">
          <a
            href="/accounts"
            className="flex flex-col items-center p-2 hover:bg-gray-100 md:flex-row md:mx-4 relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A9 9 0 1119 8.999m-2.1 
                   5.1A5 5 0 1012 7.999"
              />
            </svg>
            <span className="text-sm md:text-base">Accounts</span>
          </a>
          <div className="hidden group-hover:block absolute bottom-full mb-2 bg-white border border-gray-200 shadow-lg rounded p-2 w-48 md:right-0">
            <p className="text-xs text-gray-500 mb-2">Switch Account:</p>
            {allUserAccounts &&
              allUserAccounts.map((account) => (
                <a
                  key={account.id}
                  href={`/accounts/switch/${account.id}`}
                  className="block px-2 py-1 hover:bg-gray-100 rounded text-sm"
                >
                  {account.displayName}
                </a>
              ))}
          </div>
        </div>
        {/* Transactions button */}
        <a
          href="/transactions"
          className="flex flex-col items-center p-2 hover:bg-gray-100 md:flex-row md:mx-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H7a2 2 0 
                 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2m-5-5l10-10M12 14l9-9"
            />
          </svg>
          <span className="text-sm md:text-base">Transactions</span>
        </a>
        {/* Settings button */}
        <a
          href="/settings"
          className="flex flex-col items-center p-2 hover:bg-gray-100 md:flex-row md:mx-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3h4.5M12 3v2.25M7.607 5.636l.796.796M15.596 
                 5.636l-.796.796M4.5 9.75h2.25m10.5 0h2.25M3 
                 12v.75M6.403 14.596l.796-.796M16.192 
                 13.8l-.796-.796M9.75 21h4.5M12 21v-2.25M7.607 
                 18.364l.796-.796M15.596 18.364l-.796-.796"
            />
          </svg>
          <span className="text-sm md:text-base">Settings</span>
        </a>
      </div>
    </nav>
  );
};

export default Footer;