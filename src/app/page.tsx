"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
