// pages/transactions/page.js
import React from 'react';
import Layout from '../../components/Layout';

const TransactionsPage = () => {
  const headerTitle = 'Transactions';
  const currentAccountName = 'John Doe';
  const allUserAccounts = [
    { id: 1, displayName: 'John Doe' },
    { id: 2, displayName: 'My Other Account' },
    { id: 3, displayName: 'Test Account' }
  ];

  const transactions = [
    { description: 'Course Payment', amount: -150, createdAt: new Date() },
    { description: 'Refund', amount: 50, createdAt: new Date() }
  ];

  return (
    <Layout headerTitle={headerTitle} currentAccountName={currentAccountName} allUserAccounts={allUserAccounts}>
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="bg-white shadow-sm rounded divide-y">
        {transactions.length > 0 ? (
          transactions.map((txn, index) => {
            const isPositive = txn.amount >= 0;
            return (
              <div key={index} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{txn.description}</p>
                  <p className="text-sm text-gray-500">{txn.createdAt.toLocaleDateString()}</p>
                </div>
                <div className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : '-'}${Math.abs(txn.amount)}
                </div>
              </div>
            );
          })
        ) : (
          <p className="p-4 text-gray-600">No transactions found.</p>
        )}
      </div>
    </Layout>
  );
};

export default TransactionsPage;