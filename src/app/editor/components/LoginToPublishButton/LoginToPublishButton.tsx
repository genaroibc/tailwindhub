"use client";

import { Button } from "@/app/components/shared/Button";
import { useSupabase } from "@/hooks/useSupabase";

export function LoginToPublishButton() {
  const { supabase } = useSupabase();

  return (
    <Button
      variant="secondary"
      onClick={() =>
        supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo: window.location.href,
          },
        })
      }
    >
      <img
        width={30}
        height={30}
        alt="log in to publish your component"
        src="/svg/github.svg"
      />
      Login to publish your component
    </Button>
  );
}
