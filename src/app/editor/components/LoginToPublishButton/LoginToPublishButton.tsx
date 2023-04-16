"use client";

import { Button } from "@/app/components/shared/Button";
import { useSupabase } from "@/hooks/useSupabase";
import { IconBrandGithub } from "@tabler/icons-react";

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
      <IconBrandGithub width={30} height={30} />
      Login to publish your component
    </Button>
  );
}
