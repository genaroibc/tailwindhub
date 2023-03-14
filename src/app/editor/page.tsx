"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { CodeEditor } from "./components/CodeEditor/CodeEditor";

function HomePage() {
  const { supabase } = useSupabase();

  const handleSubmit = async ({ code }: { code: string }) => {
    const data = await supabase
      .from("components")
      .insert({ author_username: "genaroibc", html_code: code });

    console.log(data);
  };

  return (
    <div>
      <CodeEditor onSubmit={handleSubmit} />
    </div>
  );
}

export default HomePage;
