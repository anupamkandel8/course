"use client";

import { useState, useEffect } from "react";

export default function BuyCoursePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/user/notBoughtCourses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
      })
      .catch(() => setMessage("Error fetching courses."));

    }, []);

  function handleBuyClick(course: any) {
    fetch("/api/user/buyCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: course.id }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setMessage("Course bought successfully!");
          setCourses((prev) => prev.filter((c) => c.id !== course.id));
        } else {
          setMessage(data.error || "Failed to buy course.");
        }
      })
      .catch(() => setMessage("Something went wrong."));
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Buy Course</h2>
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
            <button onClick={() => handleBuyClick(course)}>Buy</button>
            <h3 style={{ marginTop: "0.5rem" }}>{course.title}</h3>
          </div>
        ))}
      </div>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
