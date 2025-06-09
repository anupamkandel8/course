"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";

export default function AddCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
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
        body: JSON.stringify({ title, image, link }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setTitle("");
        setImage("");
        setLink("");
      } else {
        setMessage(data.error || "Failed to add course.");
      }
    } catch {
      setMessage("Something went wrong.");
    }
  };

  return (
    <>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcom Admin
          </Typography>
          <Button
            color="inherit"
            onClick={() => router.push("/admin/addCourse")}
          >
            Add Course
          </Button>
          {/* <Button color="inherit" onClick={handleLogout}> */}
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Box
        minHeight={`calc(100vh - 64px)`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.default"
      >
        <Paper elevation={4} sx={{ p: 5, maxWidth: 400, width: "100%" }}>
          <Typography variant="h4" fontWeight={700} mb={3} textAlign="center">
        Add Course
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="Image URL"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
          />
          <TextField
            label="Link"
            variant="outlined"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
          />
          {message && (
            <Typography
          color={message.includes("success") ? "success.main" : "error"}
          variant="body2"
          textAlign="center"
            >
          {message}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 1 }}
          >
            Add Course
          </Button>
        </Stack>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
