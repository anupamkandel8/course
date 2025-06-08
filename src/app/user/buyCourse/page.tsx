"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Alert,
} from "@mui/material";

export default function BuyCoursePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [courseLoadingMessage, setCourseLoadingMessage] =
    useState("Loading courses...");

  useEffect(() => {
    fetch("/api/user/notBoughtCourses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
      })
      .catch(() => setMessage("Error fetching courses."));

    setTimeout(() => {
      if (courses.length === 0) {
        setCourseLoadingMessage("No courses available to buy.");
      }
    }, 1000);
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
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="order-1 lg:order-2 bg-blue-200 ">
          <Box className=" lg:min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 to-blue-100 py-12">
            <Typography
              style={{ margin: "20px" }}
              variant="h4"
              component="h1"
              className="font-bold text-center  text-gray-800"
            >
              Welcome
            </Typography>
            <Box className="flex justify-center gap-4 ">
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="font-semibold"
                sx={{ px: 4, borderRadius: 2 }}
                onClick={() => router.push("/user/profile")}
              >
                Bought Courses
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                className="font-semibold"
                sx={{ py: 1.5, px: 4, borderRadius: 2 }}
                onClick={async () => {
                  try {
                    await fetch("/api/user/logout", { method: "POST" });
                  } catch (error) {
                    console.error("Error clearing userToken:", error);
                  }
                  router.push("/");
                  alert("Logged out!");
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </div>

        <div className="order-2 lg:order-1 lg:col-span-2 bg-blue-200 ">
          <Box className="min-h-screen ">
            <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mt: 4, mb: 2, color: "primary.main" }}>
              Buy Course
            </Typography>
            {message && (
              <Alert
                severity={message.includes("success") ? "success" : "error"}
                sx={{ mb: 3 }}
              >
                {message}
              </Alert>
            )}
            <Grid container spacing={4} justifyContent="center">
              {courses.map((course) => (
                <Grid xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      bgcolor: "background.paper",
                      width: 280,
                      height: 320,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "stretch",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={course.image}
                      alt={course.title}
                      sx={{
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        textAlign="center"
                        gutterBottom
                        sx={{ width: "100%" }}
                      >
                        {course.title}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, width: "100%" }}
                        onClick={() => handleBuyClick(course)}
                      >
                        Buy
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {courses.length === 0 && (
                <Grid>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                    mt={6}
                  >
                    {courseLoadingMessage}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
}
