"use client";

import { useId, useState } from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import { useSupabase } from "@/hooks/useSupabase";
import Image from "next/image";

export function CodeEditor() {
  const { session, supabase } = useSupabase();
  const componentTitleInputID = useId();
  const [code, setCode] = useState(
    "<h1 class='text-center font-extrabold text-4xl text-blue-400'>Hello world</h1>"
  );
  const [componentTitle, setComponentTitle] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!session?.user) return;

    supabase.from("components").insert({
      author_username: session.user.user_metadata.user_name,
      html_code: code,
      title: componentTitle,
    });
  };

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
        <form onSubmit={handleSubmit}>
          <input
            onChange={(event) => setComponentTitle(event.target.value)}
            type="text"
            name={componentTitleInputID}
            id={componentTitleInputID}
            placeholder="my awesome component"
            required
            minLength={5}
            maxLength={40}
          />

          <label htmlFor={componentTitleInputID}>Component title</label>
          <button className={styles.publish_btn}>
            Publish component
            <Image
              width={30}
              height={30}
              alt="publish component"
              src="/svg/face-stars.svg"
            />
          </button>
        </form>
      ) : (
        <button
          className={styles.login_btn}
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "github",
              options: {
                redirectTo: window.location.href,
              },
            })
          }
        >
          <Image
            width={30}
            height={30}
            alt="log in to publish your component"
            src="/svg/github.svg"
          />
          Login to publish your component
        </button>
      )}
    </div>
  );
}
