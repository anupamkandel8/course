'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const AdminSignupPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/admin/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || 'Signup failed');
                return;
            }

            router.push('/admin/login');
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 24 }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            autoComplete="username"
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
                            autoComplete="new-password"
                        />
                    </label>
                </div>
                {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
                <button type="submit" style={{ marginTop: 16 }}>Sign Up</button>
            </form>
            
        </div>
    );
};

export default AdminSignupPage;