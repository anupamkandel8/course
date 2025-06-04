"use client";

import { useState } from "react";

export default function AddCoursePage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!title) {
      setMessage("Title is required.");
      return;
    }
    try {
      const res = await fetch("/api/admin/addCourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, image }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Course added successfully!");
        setTitle("");
        setImage("");
      } else {
        setMessage(data.error || "Failed to add course.");
      }
    } catch {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", margin: "0.5rem 0" }}
            />
          </label>
        </div>
        <div>
          <label>
            Image URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{ width: "100%", margin: "0.5rem 0" }}
            />
          </label>
        </div>
        <button type="submit">Add Course</button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
