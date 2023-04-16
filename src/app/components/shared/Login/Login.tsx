"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/shared/Button";
import { AuthSession } from "@supabase/supabase-js";
import { IconLogout } from "@tabler/icons-react";

export function Login() {
  const { supabase } = useSupabase();
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

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
          <Button variant="outlined" onClick={signOut}>
            <IconLogout size="1rem" />
          </Button>
        </>
      ) : (
        <Button variant="solid" onClick={signIn}>
          login
        </Button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </nav>
  );
}
