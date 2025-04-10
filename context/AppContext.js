"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const router = useRouter();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [batches, setBatches] = useState([]);
  const [policy, setPolicy] = useState(null);
  const [error, setError] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [selectedEnrollments, setSelectedEnrollments] = useState([]);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  // 1) Fetch accounts globally on mount
  useEffect(() => {
    axios
      .get("/api/salesforce")
      .then((res) => {
        if (res.data.success) {
          if (res.data.account) {
            setAccounts([res.data.account]);
          } else if (res.data.accounts) {
            setAccounts(res.data.accounts);
          }
        } else {
          setError(res.data.message || "Error fetching accounts");
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  // 2) handleSelect: set the new account as selected
  function handleSelect(accountId) {
    const newSelected = accounts.find((a) => a.Id === accountId);
    setSelectedAccount(newSelected || null);
  }

  // 3) If selectedAccount changes, fetch that account’s courses
  useEffect(() => {
    if (!selectedAccount) {
      setBatches([]);
      return;
    }
  
    axios
      .get(`/api/courseQuery?accountId=${selectedAccount.Id}`)
      .then((res) => {
        if (res.data.success) {
          if (res.data.records?.length > 0) {
            const accountRecord = res.data.records[0];
            const merged = accountRecord.Enrolments || [];
            setBatches(merged);
          } else {
            setBatches([]);
            setError(res.data.message || "No course batches found");
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

  // 4) Optionally fetch refund policy
  useEffect(() => {
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
  }, []);

  // 5) handleLogout if needed
  function handleLogout() {
    document.cookie = "userToken=; path=/; max-age=0;";
    router.push("/login");
  }

  const contextValue = {
    accounts,
    setAccounts,
    selectedAccount,
    setSelectedAccount,
    batches,
    setBatches,
    policy,
    setPolicy,
    error,
    setError,
    sessionExpired,
    setSessionExpired,
    selectedEnrollments,
    setSelectedEnrollments,
    showAccountDropdown,
    setShowAccountDropdown,
    handleLogout,
    handleSelect,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}