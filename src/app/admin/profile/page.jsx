"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";

export default function ProfilePage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetch("/api/admin/allCourses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.returnedCourses || []);
        setMounted(true);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleLogout = () => {
    try {
      fetch("/api/admin/logout", { method: "POST" });
    } catch (error) {
      console.error("Error clearing adminToken:", error);
    }
    router.push("/");
    alert("Logged out!");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
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
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h5" fontWeight={600} mb={2} color="primary" >
          All Courses
        </Typography>
        {mounted && (
          <Grid container spacing={3} justifyContent="left">
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <Card
                  className="transition-shadow hover:shadow-xl"
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    bgcolor: "background.default",
                    width: 260,
                    height: 220,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100"
                    image={course.image}
                    alt={course.title}
                    sx={{
                      objectFit: "cover",
                      minHeight: 180,
                      maxHeight: 200,
                      width: "100%",
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    <Typography
                      variant="h6"
                      className="font-bold text-gray-800"
                      gutterBottom
                      align="center"
                      sx={{ width: "100%" }}
                    >
                      {course.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
