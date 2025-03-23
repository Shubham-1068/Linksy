"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Github,
  Link as LinkIcon,
  LogOut,
  Edit2,
  Trash,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

function UserPage({ params }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);

  async function getDynamicParams() {
    const { slug } = await params;
  }

  getDynamicParams();

  async function getUser(user) {
    try {
      const response = await fetch(`/api/user?user=${user}`, { method: "GET" });
      const userData = await response.json();
      setLinks(userData.urls || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (session.status === "authenticated") {
      getUser(session.data.user.email);
      console.log(session.data.user.email);
    }
  }, [session.status]);
  console.log(links);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative pt-32 pb-16 px-4">
        {/* Gradient Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none h-screen">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto">
          {session.status === "unauthenticated" && (
            <div className="text-center">
              <button
                onClick={() => signIn("github")}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium flex items-center justify-center space-x-3 group"
              >
                <Github className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Sign in with GitHub</span>
              </button>
            </div>
          )}

          {session.status === "authenticated" && (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative">
                    <Image
                      src={session.data.user.image}
                      alt={session.data.user.name}
                      width={100}
                      height={100}
                      className="rounded-full ring-2 ring-purple-400/20"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-1.5">
                      <Github className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-2">
                    <h1 className="text-2xl font-bold">
                      {session.data.user.name}
                    </h1>
                    <p className="text-white/70">{session.data.user.email}</p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
                      <button
                        onClick={() => signOut()}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links Section */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Your Links</h2>
                  <Link
                    href={`/user/${session.data.user.name}/edit`}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium flex items-center space-x-2"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                </div>

                {links &&
                  links.map((link) => (
                    <div
                      key={Math.random()}
                      className="flex items-center justify-between mb-6"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">{link}</div>
                      </div>
                    </div>
                  ))}

                {links.length === 0 && (
                  <div className="text-center py-8">
                    <LinkIcon className="h-12 w-12 text-white/10 mx-auto mb-4" />
                    <p className="text-white/50 text-sm">
                      You haven't added any links yet. Click "Add New Link" to
                      get started!
                    </p>
                  </div>
                )}
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <p className="text-2xl font-bold text-purple-400">{links.length}</p>
                  <p className="text-sm text-white/70">Total Links</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
