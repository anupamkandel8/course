"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      className="home-container"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h3"}
        component="h1"
        className="font-bold text-gray-800 mb-8"
        gutterBottom
        sx={{
          mb: { xs: 4, sm: 8 },
          textAlign: "center",
        }}
      >
        Welcome to Future of Learning
      </Typography>
      <Box
        className="flex gap-4 mb-6"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: { xs: 4, sm: 6 },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          className="font-semibold"
          onClick={() => router.push("/user/signup")}
        >
          Signup
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className="font-semibold"
          onClick={() => router.push("/user/login")}
        >
          Login
        </Button>
      </Box>
      <Box mt={2} sx={{ width: { xs: "100%", sm: "auto" }, textAlign: "center" }}>
        <Link href="/admin/login" passHref>
          <Button
            fullWidth={isMobile}
            variant="text"
            color="secondary"
            className="underline text-blue-600"
          >
            Admin Login
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
