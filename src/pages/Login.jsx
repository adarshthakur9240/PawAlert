import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
            <h1>Login Page (Coming Soon)</h1>
            <Link to="/register" className="text-orange-500 ml-2">Go to Register</Link>
        </div>
    );
}
