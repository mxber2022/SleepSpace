import React from "react";
import {
  Moon,
  Twitter,
  Github,
  Heart,
  ExternalLink,
  Linkedin,
} from "lucide-react";

const SleepSpaceLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="#eda3b8" />
    <circle cx="50" cy="50" r="20" fill="#fff1f5" />
  </svg>
);

const TwitterIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 72 72"
    viewBox="0 0 72 72"
    id="twitter-x"
    {...props} // Allow passing className and other props
  >
    <g>
      <path d="M42.5,31.2L66,6h-6L39.8,27.6L24,6H4l24.6,33.6L4,66h6l21.3-22.8L48,66h20L42.5,31.2z M12.9,10h8l38.1,52h-8L12.9,10z" />
    </g>
  </svg>
);

export function Footer() {
  return (
    <footer className="relative mt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/50 to-primary-100/50 pointer-events-none"></div>

      {/* Curved separator */}
      <div className="absolute -top-24 left-0 right-0 h-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-50/20"></div>
        <svg
          viewBox="0 0 1440 100"
          className="absolute bottom-0 w-full h-full fill-primary-100/20"
        >
          <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-200/30 blur-lg group-hover:bg-primary-300/40 transition-colors"></div>
              {/* <Moon className="w-8 h-8 text-primary-500 relative group-hover:scale-110 transform transition-transform" /> */}
              <SleepSpaceLogo />
            </div>
            <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 font-display tracking-wider">
              SLEEP<span className="font-semibold">SPACE</span>
            </span>
          </div>

          <p className="text-night-600 max-w-sm text-center leading-relaxed">
            Transform your sleep habits into rewards while maintaining your
            privacy.
          </p>

          <div className="flex gap-6">
            <SocialLink
              href=""
              icon={<TwitterIcon className="w-5 h-5" />}
              label="Twitter"
            />
            <SocialLink
              href="https://github.com/mxber2022/SleepSpace"
              icon={<Github className="w-5 h-5" />}
              label="GitHub"
            />
            <SocialLink
              href="#linkedin"
              icon={<Linkedin className="w-5 h-5" />}
              label="LinkedIn"
            />
          </div>

          {/* Bottom bar */}
          <div className="w-full pt-8 border-t border-primary-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-body-sm text-night-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-primary-500 animate-bounce-slight" />
              <span>by SLEEPSPACE © 2025</span>
            </div>
            <a
              href="#status"
              className="text-body-sm text-night-600 hover:text-primary-600 transition-colors flex items-center gap-1 group"
            >
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>All systems operational</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a href={href} aria-label={label} className="relative group">
      <div className="absolute inset-0 bg-primary-200/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative bg-white p-3 rounded-full text-night-600 hover:text-primary-600 transition-colors hover:scale-110 transform duration-200 shadow-sm ring-1 ring-primary-100">
        {icon}
      </div>
    </a>
  );
}
