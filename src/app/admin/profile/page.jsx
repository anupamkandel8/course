"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear token from cache
    try {
      fetch("/api/admin/logout", { method: "POST" });
    } catch (error) {
      console.error("Error clearing token:", error);
    }
    router.push("/");
    alert("Logged out!");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome admin</h1>
      <button
        onClick={handleLogout}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Logout
      </button>
    </div>
  );
}
