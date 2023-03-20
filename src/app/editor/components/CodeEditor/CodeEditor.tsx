"use client";

import { useState } from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import { useSupabase } from "@/hooks/useSupabase";
import Image from "next/image";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: ({ code }: { code: string }) => void;
};

export function CodeEditor({ onSubmit }: Props) {
  const { session, supabase } = useSupabase();
  const [code, setCode] = useState(
    "<h1 class='text-center font-extrabold text-4xl text-blue-400'>Hello world</h1>"
  );

  return (
    <div className={styles.editorContainer}>
      <div dangerouslySetInnerHTML={{ __html: code }}></div>
      <Editor
        theme="vs-dark"
        height={300}
        defaultLanguage="html"
        defaultValue={code}
        onChange={(code) => setCode(code ?? "")}
        line={2}
      />

      {session?.user ? (
        <button onClick={() => onSubmit({ code })}>Publish component</button>
      ) : (
        <button
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "github",
            })
          }
        >
          <Image
            width={30}
            height={30}
            alt="log in to publish your component"
            src="/svg/github"
          />
          Login to publish your component
        </button>
      )}
    </div>
  );
}
