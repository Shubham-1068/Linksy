"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Link as LinkIcon, LogOut, Share2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";

function EditPage() {
  const { slug } = useParams();
  const [Users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getUsers();
    }
  }, [status]);

  if (status === "unauthenticated") {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  // API functions remain unchanged
  async function getUsers() {
    try {
      const response = await fetch("/api/links", { method: "GET" });
      const users = await response.json();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function checkUser() {
    if (!session?.user?.email) return;
    try {
      const response = await fetch("/api/links", { method: "GET" });
      const users = await response.json();
      const userExists = users.some(
        (element) => element.user === session.user.email
      );

      if (userExists) {
        await updateUser();
      } else {
        await createUser();
      }
      setInputValue("");
      getUsers();
    } catch (error) {
      console.error("Error checking user:", error);
    }
  }

  async function createUser() {
    const urls = document.getElementById("urls").value;
    if (!session?.user?.email) return;
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: session.user.email, urls: [urls] }),
      });
      const data = await response.json();
      console.log("User created:", data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  async function updateUser() {
    const urls = document.getElementById("urls").value;
    if (!session?.user?.email) return;
    try {
      const response = await fetch("/api/links", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: session.user.email, urls: [urls] }),
      });
      const data = await response.json();
      console.log("User updated:", data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  async function deleteUser(url) {
    if (!session?.user?.email) return;
    try {
      const response = await fetch("/api/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: session.user.email, urlToDelete: url }),
      });
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  if (!Users) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
          <p className="text-white/70 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="relative pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Gradient Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none h-screen">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto relative mt-10 md:mt-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
              Manage Your Links
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Add, edit, or remove your important links in one place
            </p>
          </motion.div>
          <div className="md:absolute md:top-0 md:right-0 flex flex-col sm:flex-row justify-end gap-4 mb-6 sm:mb-8">
            {session && (
              <Link
                href={`/sharelink?user=${session.user?.email}`}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium gap-2 w-full sm:w-auto justify-center"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Link>
            )}
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 hover:bg-white/[0.05] transition-colors duration-300"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                id="urls"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your URL here..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition-all text-white placeholder-white/50 text-sm sm:text-base"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={checkUser}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-1 hover:from-purple-500 hover:to-blue-500 transition-all text-sm sm:text-base"
              >
                <Plus size={20} />
                Add Link
              </motion.button>
            </div>
          </motion.div>

          {status === "authenticated" && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/[0.05] transition-colors duration-300"
            >
              <h2 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4 sm:mb-6">
                Your Links
              </h2>
              <AnimatePresence>
                {Users.length > 0 &&
                  Users.map(
                    (user) =>
                      user.user === session.user.email && (
                        <motion.div key={user.user} className="space-y-4">
                          {user.urls.map((url) => (
                            <motion.div
                              key={url}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ opacity: 0, x: -100 }}
                              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/[0.02] rounded-lg group hover:bg-white/[0.05] transition-all border border-white/5"
                            >
                              <div className="flex items-center gap-3 w-full sm:w-auto mb-2 sm:mb-0">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all flex-shrink-0">
                                  <LinkIcon className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                                </div>
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white/70 hover:text-purple-400 transition-colors text-sm sm:text-base break-all"
                                >
                                  {url}
                                </a>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteUser(url)}
                                className="p-2 text-white/40 hover:text-red-400 transition-colors w-full sm:w-auto flex sm:justify-end"
                              >
                                <Trash2 size={20} />
                              </motion.button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )
                  )}
              </AnimatePresence>
              {Users.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <LinkIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white/10 mx-auto mb-4" />
                  <p className="text-white/50 text-sm sm:text-base">
                    You haven't added any links yet. Click "Add Link" to get
                    started!
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditPage;
