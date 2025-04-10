// pages/settings/page.js
import React from 'react';
import Layout from '../../components/Layout';

const SettingsPage = () => {
  const headerTitle = 'Settings';
  const currentAccountName = 'John Doe';
  const allUserAccounts = [
    { id: 1, displayName: 'John Doe' },
    { id: 2, displayName: 'My Other Account' },
    { id: 3, displayName: 'Test Account' }
  ];

  // Sample settings—replace with real data or state management as needed.
  const settings = {
    email_notifications: true,
    dark_mode: false
  };

  return (
    <Layout headerTitle={headerTitle} currentAccountName={currentAccountName} allUserAccounts={allUserAccounts}>
      <h2 className="text-xl font-semibold mb-4">User Settings</h2>
      <div className="space-y-4">
        {/* Email Notifications */}
        <div className="bg-white p-4 rounded shadow-sm flex items-center justify-between">
          <div>
            <p className="font-semibold">Email Notifications</p>
            <p className="text-sm text-gray-500">Enable or disable email updates</p>
          </div>
          <input
            type="checkbox"
            className="h-5 w-5"
            defaultChecked={settings.email_notifications}
          />
        </div>
        {/* Dark Mode */}
        <div className="bg-white p-4 rounded shadow-sm flex items-center justify-between">
          <div>
            <p className="font-semibold">Dark Mode</p>
            <p className="text-sm text-gray-500">Enable a dark theme interface</p>
          </div>
          <input
            type="checkbox"
            className="h-5 w-5"
            defaultChecked={settings.dark_mode}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;