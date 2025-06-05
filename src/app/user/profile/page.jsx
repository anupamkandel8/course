"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    
    fetch("/api/user/allCourses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.returnedCourses || []);
        setMounted(true);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleLogout = () => {
    // Clear userToken from cache
    try {
      fetch("/api/user/logout", { method: "POST" });
    } catch (error) {
      console.error("Error clearing userToken:", error);
    }
    router.push("/");
    alert("Logged out!");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome user</h1>
      <button
        onClick={() => router.push("/user/addCourse")}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Add Course
      </button>
      <button
        onClick={handleLogout}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Logout
      </button>
      <div style={{ marginTop: "2rem" }}>
        <h2>All Courses</h2>
        {mounted && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {courses.map((course) => {
              return (
                <div
                  key={course.id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "1rem",
                    width: "200px",
                  }}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                  <h3 style={{ marginTop: "0.5rem" }}>{course.title}</h3>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
