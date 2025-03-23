"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LinkIcon, Share2, Copy, Check } from "lucide-react";
import { useSession } from "next-auth/react";

function SharePageContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [decodedUser, setDecodedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userParam = searchParams.get("user");
    if (userParam) {
      setDecodedUser(decodeURIComponent(userParam));
    }
  }, [searchParams]);

  useEffect(() => {
    if (decodedUser) {
      getUser(decodedUser);
    }
  }, [decodedUser]);

  async function getUser(user) {
    try {
      const response = await fetch(`/api/user?user=${user}`, { method: "GET" });
      const userData = await response.json();
      setUsers(userData.urls || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const shareUrl = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Shared Links by ${decodedUser}`,
          text: `Check out these links shared by ${decodedUser}`,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      copyToClipboard();
      alert("URL copied to clipboard. You can now share it manually.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  if (!decodedUser) {
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

        <div className="max-w-4xl mx-auto relative top-10 md:top-16">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
              Shared Links
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Try Linksy and simplify your online presence with just one link !
            </p>

            {/* Share and Copy URL buttons */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center gap-3 mt-6 mb-12 font-semibold"
            >
              <button
                onClick={shareUrl}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-all text-sm"
              >
                <Share2 className="h-4 w-4 text-purple-400" />
                <span>Share</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-all text-sm"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-purple-400" />
                )}
                <span>{copied ? "Copied!" : "Copy URL"}</span>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/[0.05] transition-colors duration-300 max-h-[40vh] overflow-y-auto"
          >
            <AnimatePresence>
              {users.length > 0 ? (
                <div className="space-y-4">
                  {users.map((url, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg group hover:bg-white/[0.05] transition-all border border-white/5"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all flex-shrink-0">
                          <LinkIcon className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        </div>
                        <a
                          href={url}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="text-white hover:text-purple-400 transition-colors text-sm sm:text-base break-all"
                        >
                          {url}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <LinkIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white/10 mx-auto mb-4" />
                  <p className="text-white/50 text-sm sm:text-base">
                    {decodedUser ? "No links found." : "Loading links..."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <p className="text-white/70">Loading...</p>
        </div>
      }
    >
      <SharePageContent />
    </Suspense>
  );
}
