"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Link as LinkIcon } from "lucide-react";
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

  async function getUsers() {
    try {
      const response = await fetch("/api/links", {
        method: "GET",
      });
      const users = await response.json();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function checkUser() {
    if (!session?.user?.email) return;

    try {
      const response = await fetch("/api/links", {
        method: "GET",
      });
      const users = await response.json();

      const userExists = users.some((element) => element.user === session.user.email);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: session.user.email,
          urls: [urls],
        }),
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: session.user.email,
          urls: [urls],
        }),
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: session.user.email,
          urlToDelete: url,
        }),
      });
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <button onClick={() => signOut()}>Logout</button>
      {session && <Link href={`/sharelink?user=${session.user?.email}`}>Share</Link>}

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Manage Your Links</h1>
          <p className="text-lg text-gray-600">Add, edit, or remove your important links in one place</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex gap-4">
            <input
              type="text"
              id="urls"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your URL here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={checkUser}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Link
            </motion.button>
          </div>
        </motion.div>

        {status === "authenticated" && (
          <motion.div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Links</h2>
            <AnimatePresence>
              {Users.length > 0 &&
                Users.map(
                  (user) =>
                    user.user === session.user.email && (
                      <motion.div key={user.user} className="space-y-4">
                        {user.urls.map((url) => (
                          <motion.div
                            key={url}
                            exit={{ opacity: 1, x: -100 }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <LinkIcon className="text-blue-500" size={20} />
                              <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                                {url}
                              </a>
                            </div>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => deleteUser(url)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 size={20} />
                            </motion.button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )
                )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default EditPage;
