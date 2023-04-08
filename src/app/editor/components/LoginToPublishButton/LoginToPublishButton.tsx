"use client";

import { Button } from "@/app/components/shared/Button";
import { GitHubIcon } from "@/app/components/shared/Icons";
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
      <GitHubIcon width={30} height={30} />
      Login to publish your component
    </Button>
  );
}
