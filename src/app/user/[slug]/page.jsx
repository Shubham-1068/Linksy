"use client";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

function userPage({ params }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);

  async function getDynamicParams() {
    const { slug } = await params;
    console.log(slug);
  }

  getDynamicParams();

  return (
    <div>
      {session.status === "unauthenticated" && (
        <button onClick={() => signIn("github")}>Sign in</button>
      )}
      {session.status === "authenticated" && (
        <>
          <button onClick={() => signOut()}>Sign out</button>

          <h1>{session.data.user.name}</h1>
          <h2>{session.data.user.email}</h2>
          <Image
            src={session.data.user.image}
            alt={session.data.user.name}
            width={100}
            height={100}
          />

          <div className="">
            <p>Start editing to see some magic happen!</p>
            <Link href={`/user/${session.data.user.name}/edit`}>Edit</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default userPage;
