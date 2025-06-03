"use client"

import React from 'react';
import { useRouter } from "next/navigation";


export default function ProfilePage() {

    const router = useRouter();

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        // Redirect to homepage
        router.push('/');
        alert('Logged out!');
    };

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome admin</h1>
            <button onClick={handleLogout} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
                Logout
            </button>
        </div>
    );
}