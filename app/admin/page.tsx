"use client";

import { useState } from "react";
import ResumeUploader from "@/components/ResumeUploader";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUnlock = () => {
    const expected = process.env.NEXT_PUBLIC_ADMIN_PAGE_PASSWORD;
    if (expected && password === expected) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password.");
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
            className="px-3 py-2 rounded-md bg-neutral-900 text-neutral-100 border border-neutral-700 focus:outline-none focus:border-neutral-500"
          />
          <button
            onClick={handleUnlock}
            className="px-3 py-2 rounded-md bg-neutral-800 text-neutral-100 hover:bg-neutral-700"
          >
            Unlock
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <ResumeUploader />
    </div>
  );
}
