"use client";

import { useState } from "react";

type Status = "idle" | "uploading" | "success" | "error";

interface ResumeUploaderProps {
  password: string;
}

export default function ResumeUploader({ password }: ResumeUploaderProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const loadingSteps = [
    "Uploading PDF...",
    "Extracting text...",
    "Structuring data with Gemini AI...",
    "Committing to GitHub..."
  ];

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setMessage(loadingSteps[0]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < loadingSteps.length) {
        setMessage(loadingSteps[step]);
      }
    }, 2500); // cycle message every 2.5s

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("/api/upload-resume", {
        method: "POST",
        headers: {
          "x-upload-secret": password,
        },
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Upload failed");
      }

      setStatus("success");
      setMessage(json.message || "Resume processed successfully.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      clearInterval(interval);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <label className="text-sm font-medium text-neutral-200">
        Upload resume (PDF only)
      </label>
      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleChange}
        disabled={status === "uploading"}
        className="block w-full text-sm text-neutral-400
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-medium
          file:bg-neutral-800 file:text-neutral-100
          hover:file:bg-neutral-700
          cursor-pointer disabled:opacity-50"
      />
      {status !== "idle" && (
        <p
          className={
            status === "error"
              ? "text-sm text-red-400"
              : status === "success"
              ? "text-sm text-green-400"
              : "text-sm text-neutral-400"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}
