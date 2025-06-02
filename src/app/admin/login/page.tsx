'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await res.json();
            // Assume the API returns { token: string }
            localStorage.setItem('token', data.token);
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            autoFocus
                        />
                    </label>
                </div>
                <div style={{ marginTop: 12 }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                {error && (
                    <div style={{ color: 'red', marginTop: 12 }}>{error}</div>
                )}
                <button type="submit" style={{ marginTop: 16 }}>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;