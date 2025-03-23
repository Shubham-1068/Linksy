"use client";

import { Link as LinkIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-screen top-4 z-50 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-5 w-5 text-purple-400" />
              <span className="text-base font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                Linksy
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm text-white/70 hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link href="#features" className="text-sm text-white/70 hover:text-purple-400 transition-colors">
                Features
              </Link>
              <Link href="https://github.com/Shubham-1068/Linksy" className="text-sm text-white/70 hover:text-purple-400 transition-colors">
                Git-Hub
              </Link>
              <div className="flex items-center space-x-3">
                {session.status === "unauthenticated" && (
                  <Link 
                  href="/login" 
                  className="px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
                )}
                {
                  session.status === "authenticated" && (
                    <button 
                    onClick={() => signOut()} 
                    className="px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-opacity"
                  >
                    Sign Out
                  </button>
                  )
                }
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-14 space-y-4">
              <Link href="/" onClick={()=> setIsMenuOpen(false)} className="block text-xl text-white/70 hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link href="#features" onClick={()=> setIsMenuOpen(false)} className="block text-xl text-white/70 hover:text-purple-400 transition-colors">
                Features
              </Link>
              <Link href="https://github.com/Shubham-1068/Linksy" target="_blank" onClick={()=> setIsMenuOpen(false)} className="block text-xl text-white/70 hover:text-purple-400 transition-colors">
                Git-Hub
              </Link>
              <div className="flex flex-col space-y-4 mt-10">
                {session.status === "unauthenticated" && (
                  <Link 
                  href="/login"  onClick={()=> setIsMenuOpen(false)}
                  className="w-full text-center px-3 py-1.5 text-lg rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-opacity"
                >
                  Get Started !
                </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}