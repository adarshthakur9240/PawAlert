import React from "react";
import { Link } from "react-router-dom"; // 🔥 Navigation ke liye
import {
  Zap,
  Heart,
  Linkedin,
  Mail,
  Github,
  Phone,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] px-6 pt-24 pb-12 md:px-16 lg:px-32 w-full text-white font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        {/* 1. BRAND SECTION (Left Side) */}
        <div className="flex flex-col items-start w-full md:w-[35%]">
          <div
            className="flex items-center gap-2 mb-6 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Zap size={28} className="text-orange-500 fill-orange-500" />
            <span className="text-3xl font-black tracking-tighter">
              {" "}
              PawAlert{" "}
            </span>
          </div>
          <p className="text-[#94a3b8] text-[16px] leading-relaxed opacity-80">
            Making cities safer for stray animals through technology and
            community action. Join the revolution in animal welfare across
            Noida.
          </p>
        </div>

        {/* 2. LINKS SECTION (Right Side - Perfectly Aligned) */}
        <div className="flex flex-1 flex-row flex-wrap md:flex-nowrap justify-between w-full md:w-[60%] gap-8">
          {/* Column: Resources (Active Links) */}
          <div className="min-w-[120px]">
            <h3 className="text-white font-outfit text-[20px] font-black mb-8 ">
              {" "}
              Resources{" "}
            </h3>
            <ul className="space-y-4 text-[#94a3b8] text-[14px] font-medium">
              <li className="hover:text-white transition-colors">
                <Link to="/docs">Documentation</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link to="/partners">NGO Partners</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link to="/guide">Volunteer Guide</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link to="/status">API Status</Link>
              </li>
            </ul>
          </div>

          {/* Column: Company (Active Links) */}
          <div className="min-w-[120px]">
            <h3 className="text-white font-outfit text-[20px] font-black mb-8 ">
              {" "}
              Company{" "}
            </h3>
            <ul className="space-y-4 text-[#94a3b8] text-[14px] font-medium">
              <li className="hover:text-white transition-colors">
                <Link to="/about">About Us</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link to="/support">Support</Link>
              </li>
            </ul>
          </div>

          {/* Column: About Developer (Linked with Icons) */}
          <div className="min-w-[200px]">
            <h3 className="text-white font-outfit text-[20px] font-black mb-8  underline decoration-orange-500/40 underline-offset-8">
              About Developer
            </h3>
            <ul className="space-y-4 text-[#94a3b8] text-[13px] font-medium">
              <li>
                <a
                  href="https://instagram.com/adarshhh__thakur"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Instagram size={14} className="text-orange-500" />
                  <span>Instagram Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/adarsh-thakur-7683612a4"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Linkedin size={14} className="text-orange-500" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/adarshthakur9240"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Github size={14} className="text-orange-500" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Mail size={14} className="text-orange-500" />
                <a href="mailto:singhadadarsh9240@gmail.com">
                  singhadadarsh9240@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Phone size={14} className="text-orange-500" />
                <a href="tel:+916386247822">+91 6386247822</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[13px] text-slate-500 font-medium">
        <p>
          Copyright {currentYear} ©{" "}
          <span className="text-gray-300">PawAlert India</span>. Built by Adarsh
          Thakur. All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
