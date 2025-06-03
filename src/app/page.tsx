"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch("/api/admin/login", { credentials: "include" });
        console.log("Checking token:", res);
        if (res.ok) {
          const data = await res.json();
          if (data.adminToken) {
            router.push("/admin/profile");
          }
        }
      } catch (e) {
        // handle error silently
      }
    };
    checkToken();
  }, [router]);

    return (
    <>
      <h1>Welcome to Future of Learning</h1>
      <button onClick={() => router.push("/admin/signup")}>Admin Signup</button>
      <button onClick={() => router.push("/admin/login")}>Admin Login</button>
      <button onClick={() => router.push("/user/signup")}>User Signup</button>
      <button onClick={() => router.push("/user/login")}>User Login</button>
    </>
  );
}
