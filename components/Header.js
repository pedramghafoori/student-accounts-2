"use client";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Header() {
  const {
    accounts,
    selectedAccount,
    showAccountDropdown,
    setShowAccountDropdown,
    handleLogout,
    handleSelect,
  } = useContext(AppContext);

  return (
    <header className="header-wave-parent relative bg-blue-500 text-white overflow-hidden">
      <div
        className="my-header absolute inset-0 p-6 flex items-center justify-between"
        style={{ zIndex: 10 }}
      >
        {/* LEFT: Show the selected account’s name */}
        <div>
          <h1 className="text-2xl font-bold">Student Portal</h1>
          {selectedAccount && (
            <p className="text-lg font-semibold">{selectedAccount.Name}</p>
          )}
        </div>

        {/* RIGHT: Switch Accounts button */}
        {accounts.length > 1 && (
          <div className="relative">
            <button
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              className="flex items-center space-x-2 text-blue-100 hover:text-blue-300 border border-blue-100 px-3 py-2 rounded"
              style={{ zIndex: 10 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A9 9 0 1119 8.999m-2.1 5.1A5 5 0 1012 7.999"
                />
              </svg>
              <span>Switch Accounts</span>
            </button>

            {showAccountDropdown && (
              <div className="absolute right-0 mt-2 p-4 border rounded bg-white text-black w-48">
                <h2 className="text-xl font-bold mb-2 text-center">Accounts</h2>
                <div className="overflow-y-auto max-h-64">
                  {accounts.map((acc) => (
                    <div
                      key={acc.Id}
                      onClick={() => {
                        handleSelect(acc.Id);
                        setShowAccountDropdown(false);
                      }}
                      className="border rounded-lg p-2 mb-2 cursor-pointer hover:bg-blue-50"
                    >
                      <h2 className="text-lg">{acc.Name}</h2>
                    </div>
                  ))}
                </div>
                <div className="mt-2 border-t pt-2 text-center">
                  <button
                    onClick={handleLogout}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}