"use client";

import { Github, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-slate-200">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-purple-400" />
            <span>by Shubham 😁</span>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Link 
              href="https://github.com/Shubham-1068/Linksy" 
              target="_blank"
              className="flex items-center space-x-2 text-sm text-slate-200 hover:text-purple-400 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}