"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SharePageContent() {
  const searchParams = useSearchParams();
  const [decodedUser, setDecodedUser] = useState("");
  const [users, setUsers] = useState([]);

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
      const response = await fetch(
        `/api/user?user=${user}`,
        { method: "GET" }
      );
      const userData = await response.json();
      setUsers(userData.urls || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  return (
    <div>
      <h1>Share Link</h1>
      <ul>
        {users.length > 0 ? (
          users.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))
        ) : (
          <p>No links found.</p>
        )}
      </ul>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SharePageContent />
    </Suspense>
  );
}
