"use client"
import Login from './auth/page';

export default function Home() {
  // Always show login page - let auth/page.jsx handle the redirect logic
  return <Login />;
}

