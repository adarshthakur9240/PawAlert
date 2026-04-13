import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="flex h-screen w-full bg-[#050505] font-['Inter'] text-white items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-black mb-4">PAW ALERT LOGIN</h1>
                <p className="text-zinc-500 mb-8">Ready for the next mission?</p>
                <Link to="/register" className="text-orange-500 underline">Don't have an account? Register</Link>
            </div>
        </div>
    );
}
