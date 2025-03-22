"use client";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function page() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push(`/user/${session.data.user.name}`);
    }
  }, [session.status, router]);

  return (
    <div>
      {session.status === "unauthenticated" && (
        <button onClick={() => signIn("github")}>Sign in</button>
      )}
    </div>
  );
}

export default page;
