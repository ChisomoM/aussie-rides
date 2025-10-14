"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u: User | null) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in error", error);
      alert("Sign in failed");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (loading) return <div className="p-8">Checking authentication...</div>;

  if (!user) {
    return (
      <div className="p-8 bg-white rounded-2xl shadow text-center">
        <h2 className="text-xl font-semibold mb-2">Admin Sign In</h2>
        <p className="text-sm text-gray-600 mb-4">Sign in with Google to access admin tools.</p>
        <button onClick={handleSignIn} className="px-6 py-3 bg-emerald-600 text-white rounded-lg">Sign in with Google</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 p-4 bg-white/80 rounded-xl shadow">
        <div className="flex items-center gap-3">
          <Image src={(user.photoURL as string) || '/next.svg'} alt="avatar" width={40} height={40} className="rounded-full" />
          <div>
            <div className="font-semibold">{user.displayName || user.email}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
        <div>
          <button onClick={handleSignOut} className="px-4 py-2 bg-rose-500 text-white rounded">Sign out</button>
        </div>
      </div>

      {children}
    </div>
  );
}
