import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-[2.5rem] bg-[#0a0a0a] border border-zinc-800 p-10 shadow-2xl">
                <h1 className="mb-2 text-center text-4xl font-black text-white tracking-tight">Create Account</h1>
                <p className="mb-10 text-center text-zinc-500 text-sm font-medium">Join the mission to protect stray animals.</p>
                <form className="space-y-4">
                    <input type="email" placeholder="Email Address" className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    <input type="password" placeholder="Password" className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    <button className="py-4 mt-2 font-bold w-full rounded-2xl bg-orange-500 text-black text-lg">Join Tribe 🐾</button>
                </form>
                <div className="relative my-10 text-center">
                    <span className="relative z-10 bg-[#0a0a0a] px-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">Or continue with</span>
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-zinc-800/50"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex py-3 items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 font-bold text-sm">Github</button>
                    <button className="flex py-3 items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 font-bold text-sm">Google</button>
                </div>
                <p className="mt-10 text-center text-sm text-zinc-500">Already a savior? <Link to="/login" className="text-orange-500 font-bold">Login here</Link></p>
            </div>
        </div>
    );
}
