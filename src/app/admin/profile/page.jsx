"use client";

import React, { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    fetch("/api/admin/allCourses")
      .then((res) => res.json())
      .then((data) => setCourses(data.returnedCourses || []))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleLogout = () => {
    // Clear adminToken from cache
    try {
      fetch("/api/admin/logout", { method: "POST" });
    } catch (error) {
      console.error("Error clearing adminToken:", error);
    }
    router.push("/");
    alert("Logged out!");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome admin</h1>
      <button
        onClick={() => router.push("/admin/addCourse")}
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {courses.map((course) => (
            <div
              key={course.imageId}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                width: "200px",
              }}
            >
              <img
                src={course.image}
                alt={course.title}
                style={{ width: "100%", height: "120px", objectFit: "cover" }}
              />
              <h3 style={{ marginTop: "0.5rem" }}>{course.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
