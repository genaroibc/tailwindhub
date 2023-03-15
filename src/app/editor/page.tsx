"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { CodeEditor } from "./components/CodeEditor/CodeEditor";

function HomePage() {
  const { supabase, session } = useSupabase();

  const handleSubmit = async ({ code }: { code: string }) => {
    if (!session?.user) return;

    await supabase.from("components").insert({
      author_username: session.user.user_metadata.user_name,
      html_code: code,
    });
  };

  return (
    <div>
      <CodeEditor onSubmit={handleSubmit} />
    </div>
  );
}

export default HomePage;
