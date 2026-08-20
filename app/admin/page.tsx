"use client";

import { useState } from "react";
import ResumeUploader from "@/components/ResumeUploader";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    if (!password) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setUnlocked(true);
      } else {
        const data = await res.json();
        setError(data.error || "Incorrect password.");
      }
    } catch (err) {
      setError("An error occurred verifying the password.");
    } finally {
      setLoading(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col gap-3 w-full max-w-xs px-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            placeholder="Password"
            disabled={loading}
            className="px-3 py-2 rounded-md bg-neutral-900 text-neutral-100 border border-neutral-700 focus:outline-none focus:border-neutral-500 disabled:opacity-50"
          />
          <button
            onClick={handleUnlock}
            disabled={loading}
            className="px-3 py-2 rounded-md bg-neutral-800 text-neutral-100 hover:bg-neutral-700 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Unlock"}
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <ResumeUploader password={password} />
    </div>
  );
}
