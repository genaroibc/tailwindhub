"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { useState } from "react";
import { LogoutIcon } from "../Icons";

export function Login() {
  const { supabase, session } = useSupabase();
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.href,
      },
    });

    if (error) {
      return setError(error.message);
    }

    setError(null);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return setError(error.message);
    }

    setError(null);
  };

  return (
    <nav className="flex justify-center items-center gap-4">
      {session?.user ? (
        <>
          <div className="flex justify-center items-center gap-2">
            <span className="font-semibold hidden sm:block">
              {session.user.user_metadata.user_name}
            </span>
            <img
              className="rounded-full max-w-full w-8"
              width={50}
              height={50}
              alt={session.user.user_metadata.user_name}
              src={session.user.user_metadata.avatar_url}
            />
          </div>
          <button
            className="py-2 px-4 border-2 border-solid border-light-brown bg-transparent text-light-brown transition-colors hover:border-dark-brown"
            onClick={signOut}
          >
            <LogoutIcon
              width="1rem"
              height="1rem"
              fill="var(--dimmed-black, #000)"
            />
          </button>
        </>
      ) : (
        <button
          className="py-2 px-4 border-2 border-transparent bg-light-brown text-white transition-colors hover:bg-dark-brown"
          onClick={signIn}
        >
          login
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </nav>
  );
}
