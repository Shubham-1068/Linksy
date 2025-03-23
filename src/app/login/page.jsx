"use client";

import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

function SignInPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push(`/user/${session.data.user.name}`);
    }
  }, [session.status, router]);

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="relative pt-32 pb-16 md:pt-0 md:pb-0 px-4">
        {/* Gradient Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none h-screen">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-md mx-auto h-screen md:flex flex-col justify-center">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-center space-y-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                Welcome to Linksy
              </h1>
              
              <p className="text-sm text-white/70">
                Sign in with GitHub to create and manage your link collection
              </p>

              {session.status === "unauthenticated" && (
                <button
                  onClick={() => signIn("github")}
                  className="w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium flex items-center justify-center space-x-3 group"
                >
                  <Github className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>Continue with GitHub</span>
                </button>
              )}

              <p className="text-xs text-white/50">
                By signing in, you agree to our{" "}
                <a href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SignInPage;