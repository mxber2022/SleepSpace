import React from 'react';
import { Moon, Twitter, Github, Heart, ExternalLink, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/50 to-primary-100/50 pointer-events-none"></div>

      {/* Curved separator */}
      <div className="absolute -top-24 left-0 right-0 h-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-50/20"></div>
        <svg viewBox="0 0 1440 100" className="absolute bottom-0 w-full h-full fill-primary-100/20">
          <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-200/30 blur-lg group-hover:bg-primary-300/40 transition-colors"></div>
              <Moon className="w-8 h-8 text-primary-500 relative group-hover:scale-110 transform transition-transform" />
            </div>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-night-900 via-primary-600 to-primary-400 font-display tracking-tight">
              SleepSpace
            </span>
          </div>
          
          <p className="text-night-600 max-w-sm text-center leading-relaxed">
            Transform your sleep habits into rewards while maintaining your privacy.
          </p>

          <div className="flex gap-6">
            <SocialLink href="#twitter" icon={<Twitter className="w-5 h-5" />} label="Twitter" />
            <SocialLink href="#github" icon={<Github className="w-5 h-5" />} label="GitHub" />
            <SocialLink href="#linkedin" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
          </div>

          {/* Bottom bar */}
          <div className="w-full pt-8 border-t border-primary-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-body-sm text-night-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-primary-500 animate-bounce-slight" />
              <span>by SleepSpace © 2025</span>
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

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href}
      aria-label={label}
      className="relative group"
    >
      <div className="absolute inset-0 bg-primary-200/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative bg-white p-3 rounded-full text-night-600 hover:text-primary-600 transition-colors hover:scale-110 transform duration-200 shadow-sm ring-1 ring-primary-100">
        {icon}
      </div>
    </a>
  );
}