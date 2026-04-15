import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{
    baseTheme: undefined,
    variables: {
      colorPrimary: "#f59e0b",
      colorBackground: "#0a0a0a",
      colorInputBackground: "#111111",
      colorInputText: "#ffffff",
      colorText: "#ffffff",
      colorTextSecondary: "#a1a1aa",
      colorNeutral: "#27272a",
      borderRadius: "14px",
      fontFamily: "Inter, sans-serif",
    },
    elements: {
      card: "bg-[#0f0f0f] border border-zinc-800 shadow-2xl",
      headerTitle: "text-white font-black tracking-tighter",
      headerSubtitle: "text-zinc-400",
      formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-black font-black uppercase tracking-widest",
      formFieldInput: "bg-black border-zinc-800 text-white focus:border-orange-500",
      footerActionLink: "text-orange-500 hover:text-orange-400 font-bold",
      identityPreviewText: "text-white",
      formFieldLabel: "text-zinc-400 text-xs font-black uppercase tracking-widest",
      socialButtonsBlockButton: "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800",
      dividerLine: "bg-zinc-800",
      dividerText: "text-zinc-500",
    }
  }}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </ClerkProvider>
);
