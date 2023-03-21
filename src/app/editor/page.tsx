"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { Database } from "@/types/db";
import { CodeEditor } from "./components/CodeEditor/CodeEditor";

function HomePage() {
  const { supabase } = useSupabase();

  const handleSubmit = async (
    componentData: Database["public"]["Tables"]["components"]["Insert"]
  ) => {
    await supabase.from("components").insert(componentData);
  };

  return (
    <div>
      <CodeEditor onSubmit={handleSubmit} />
    </div>
  );
}

export default HomePage;
