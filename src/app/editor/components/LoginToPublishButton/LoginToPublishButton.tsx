"use client";

import { Button } from "@/app/components/shared/Button";
import { useSupabase } from "@/hooks/useSupabase";
import { AuthSession } from "@supabase/supabase-js";
import { IconBrandGithub } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export function LoginToPublishButton(props: Props) {
  const { supabase } = useSupabase();
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <>
      {session?.user.user_metadata ? (
        <Button {...props} />
      ) : (
        <Button
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "github",
              options: {
                redirectTo: window.location.href,
              },
            })
          }
        >
          <IconBrandGithub width={30} height={30} />
          Login to publish
        </Button>
      )}
    </>
  );
}
