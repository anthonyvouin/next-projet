"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
          fontSize: "1rem",
          padding: "1rem",
          minWidth: "300px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          fontWeight: "500",
        },
        className: "font-sans",
      }}
    />
  );
} 