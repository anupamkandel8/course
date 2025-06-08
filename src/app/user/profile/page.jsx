"use client";

import { useEffect, useState } from "react";
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
} from "@mui/material";

export default function ProfilePage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    fetch("/api/user/boughtCourses")
      .then((res) => res.json())
      .then((data) => {
        setMounted(true);
        setCourses(data.courses || []);
        setUsername(data.user.name);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);
  // Capitalize the first letter of the username
  const displayName =
    username && username.length > 0
      ? username.charAt(0).toUpperCase() + username.slice(1)
      : "User";

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
              Welcome {displayName}
            </Typography>
            <Box className="flex justify-center gap-4 ">
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="font-semibold"
                sx={{ px: 4, borderRadius: 2 }}
                onClick={() => router.push("/user/buyCourse")}
              >
                Buy Course
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
            <Typography
              style={{ margin: "0px" }}
              variant="h4"
              className="font-semibold text-center  text-gray-700"
            >
              All Courses
            </Typography>
            {mounted && (
              <Grid container spacing={3} justifyContent="center">
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
                          width: "100%"}
                        }
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
                {courses.length === 0 && (
                  <Typography
                    variant="body1"
                    className="text-gray-500 text-center w-full mt-6"
                  >
                    You have not bought any courses yet.
                  </Typography>
                )}
              </Grid>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
