'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Link,
    Paper,
} from '@mui/material';

const UserSignupPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || 'Signup failed');
                return;
            }

            router.push('/user/login');
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f6fa"
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    width: 400,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(8px)',
                }}
            >
                <Typography variant="h4" fontWeight={700} mb={2} align="center" color="primary">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        InputProps={{
                            sx: { borderRadius: 2 },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        InputProps={{
                            sx: { borderRadius: 2 },
                        }}
                    />
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            borderRadius: 2,
                            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                            textTransform: 'none',
                        }}
                    >
                        Sign Up
                    </Button>
                    <Box mt={3} textAlign="center">
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link href="/user/login" underline="hover" color="secondary">
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default UserSignupPage;