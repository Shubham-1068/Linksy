"use client";

import { Link as LinkIcon, Share2, Sparkles, Zap, Shield, BarChart } from "lucide-react";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import {useRouter} from "next/navigation"

export default function HomePage() {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        {/* Gradient Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none h-screen">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative md:mt-14">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-3 py-1 space-x-2 bg-white/5 border border-white/10 rounded-full text-sm">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-white/70">Simplify your online presence</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Share Everything You Create
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                With Just One Link
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Stop cluttering your bio with multiple links. Linksy gives you a beautiful, customizable profile 
              where you can showcase all your content, social media, and important links in one place. 
              Perfect for creators, professionals, and businesses.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <button onClick={() => router.push("/login")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Create Your Linksy Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 mt-16" id="features">
          <div className="text-3xl font-bold mb-4 text-center">
            What makes Linksy special?
          </div>
        <div className="max-w-6xl mx-auto mt-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group">
              <LinkIcon className="h-8 w-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">
                Unlimited Links
              </h3>
              <p className="text-sm text-white/70">
                Add as many links as you want to your profile. Organize them into categories for better presentation.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group">
              <Share2 className="h-8 w-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">
                Easy Sharing
              </h3>
              <p className="text-sm text-white/70">
                Share your profile with a single link. Perfect for social media bios, business cards, and email signatures.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group">
              <Sparkles className="h-8 w-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">
                Custom Styling
              </h3>
              <p className="text-sm text-white/70">
                Personalize your profile with custom themes, colors, and layouts to match your brand or style.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}