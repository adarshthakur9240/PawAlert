import React from "react";
// Baaki imports (axios, toast etc) Claude waale yahan honge

export default function Register() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-3xl bg-[#0a0a0a] border border-zinc-800 p-8 shadow-2xl">
                <h1 className="mb-2 text-center text-3xl font-black text-white tracking-tight">Create Account</h1>
                <p className="mb-8 text-center text-zinc-400 text-sm">Join the mission to protect stray animals.</p>
                
                {/* Form Inputs (Name, Email, Password etc.) */}
                <form className="space-y-4">
                   {/* ... tera existing logic yahan aayega ... */}
                    <button className="py-4 font-bold w-full rounded-full bg-orange-500 text-black text-lg shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                        Join Tribe 🐾
                    </button>
                </form>

                {/* Social Login Section */}
                <div className="relative my-10 text-center">
                    <span className="relative z-10 bg-[#0a0a0a] px-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">Or continue with</span>
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-zinc-800"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex py-3 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 transition-all">
                        {/* GitHub SVG */}
                        <span className="text-sm font-bold">Github</span>
                    </button>

                    <button type="button" className="flex py-3 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 transition-all">
                        {/* Google SVG */}
                        <span className="text-sm font-bold">Google</span>
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-zinc-500">
                    Already a savior? <a href="/login" className="text-orange-500 font-bold hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
}
