"use client"; 
// "use client" so we can use hooks (useState, useEffect) in our context

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const router = useRouter();

  // Move the same state variables from DashboardPage into here
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [batches, setBatches] = useState([]);
  const [policy, setPolicy] = useState(null);
  const [error, setError] = useState("");
  const [selectedEnrollments, setSelectedEnrollments] = useState([]);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Example of your handleLogout, but inside the context
  function handleLogout() {
    document.cookie = "userToken=; path=/; max-age=0;";
    router.push("/login");
  }

  function handleSelect(accountId) {
    const account = accounts.find((a) => a.Id === accountId);
    setSelectedAccount(account);
  }

  // Similar to your existing code, fetch accounts on mount
  useEffect(() => {
    axios
      .get("/api/salesforce")
      .then((res) => {
        if (res.data.success) {
          if (res.data.account) {
            setAccounts([res.data.account]);
          } else if (res.data.accounts) {
            setAccounts(res.data.accounts);
          } else {
            setAccounts([]);
          }
        } else {
          setError(res.data.message || "Error fetching accounts");
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  // Example: fetch policy
  useEffect(() => {
    const fetchPolicy = () => {
      axios
        .get("/api/refund-policy")
        .then((res) => {
          if (res.data.success) {
            setPolicy(res.data.policy);
          } else {
            console.error("Error fetching policy:", res.data.message);
          }
        })
        .catch((err) => console.error("Error fetching policy:", err.message));
    };
    fetchPolicy();
    const intervalId = setInterval(fetchPolicy, 300000);
    return () => clearInterval(intervalId);
  }, []);

  // Example: if selectedAccount changes, fetch relevant data
  useEffect(() => {
    if (!selectedAccount) return;
    axios
      .get(`/api/courseQuery?accountId=${selectedAccount.Id}`)
      .then((res) => {
        if (res.data.success) {
          if (res.data.records.length > 0) {
            const accountRecord = res.data.records[0];
            const subRecords = accountRecord.Enrolments ?? [];
            setBatches(subRecords);
          } else {
            setBatches([]);
          }
        } else {
          setError(res.data.message || "Error fetching batch info");
          setBatches([]);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setSessionExpired(true);
        } else {
          setError(err.message);
        }
        setBatches([]);
      });
  }, [selectedAccount]);

  // Provide these values/functions to children
  const contextValue = {
    accounts,
    selectedAccount,
    error,
    showAccountDropdown,
    setShowAccountDropdown,
    batches,
    policy,
    selectedEnrollments,
    sessionExpired,
    handleLogout,
    handleSelect,
    setSelectedEnrollments,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}