"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      router.push("/user/profile");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Paper
        elevation={6}
        className="w-full max-w-md p-8"
        sx={{
          borderRadius: 3,
          boxShadow: 6,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          className="font-bold text-center mb-8 text-gray-800"
        >
          User Login
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            style={{ marginTop: "8px", marginBottom: "8px" }}
            label="Username"
            variant="outlined"
            fullWidth
            required
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white"
          />
          <TextField
            style={{ marginTop: "8px", marginBottom: "8px" }}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white"
          />
          {error && (
            <Alert severity="error" className="mt-2">
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="font-semibold"
            sx={{ mt: 2, py: 1.5 }}
          >
            Login
          </Button>
        </form>
        <Box className="mt-6 text-center">
          <Typography variant="body2" className="text-gray-600">
            Don't have an account?{" "}
            <MuiLink
              component={Link}
              href="/user/signup"
              underline="hover"
              color="primary"
              className="font-medium"
            >
              Sign up
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
