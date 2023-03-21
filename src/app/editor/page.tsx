"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { CodeEditor } from "./components/CodeEditor/CodeEditor";
import { useState } from "react";

function HomePage() {
  const { supabase, session } = useSupabase();
  const [data, setData] = useState<any>();

  const handleSubmit = async ({ code }: { code: string }) => {
    if (!session?.user) return;

    await supabase.from("components").insert({
      author_username: session.user.user_metadata.user_name,
      html_code: code,
    });
  };
  const handleRequest = async () => {
    const result = await supabase.from("components").select("*");
    setData(result);
  };

  return (
    <div>
      <CodeEditor onSubmit={handleSubmit} />
      <button onClick={handleRequest}>Get and show supabase data</button>
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </div>
  );
}

export default HomePage;
