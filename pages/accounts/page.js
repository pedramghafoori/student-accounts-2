// pages/accounts/page.js
import React from 'react';
import Layout from '../../components/Layout';

const AccountsPage = () => {
  const headerTitle = 'My Accounts';
  const currentAccountName = 'John Doe';
  const allUserAccounts = [
    { id: 1, displayName: 'John Doe' },
    { id: 2, displayName: 'My Other Account' },
    { id: 3, displayName: 'Test Account' }
  ];

  return (
    <Layout headerTitle={headerTitle} currentAccountName={currentAccountName} allUserAccounts={allUserAccounts}>
      <h2 className="text-xl font-semibold mb-4">All Linked Accounts</h2>
      <div className="bg-white shadow-sm rounded divide-y">
        {allUserAccounts.map((account) => (
          <div key={account.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{account.displayName}</p>
              <p className="text-sm text-gray-500">Standard Account</p>
            </div>
            {account.id === 1 ? ( // assuming id === 1 is the active account
              <span className="text-green-600 text-sm font-semibold">Active</span>
            ) : (
              <a href={`/accounts/switch/${account.id}`} className="text-blue-600 hover:underline text-sm">
                Switch
              </a>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AccountsPage;