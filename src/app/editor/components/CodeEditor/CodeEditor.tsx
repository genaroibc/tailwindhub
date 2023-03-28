"use client";

import { useId, useState } from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import { useSupabase } from "@/hooks/useSupabase";
import { Loader } from "@/app/components/shared/Loader";

export function CodeEditor() {
  const { session, supabase } = useSupabase();
  const componentTitleInputID = useId();
  const [code, setCode] = useState(
    "<h1 class='text-center font-extrabold text-4xl text-blue-400'>Hello world</h1>"
  );
  const [componentTitle, setComponentTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!session?.user) return;

    setLoading(true);
    const { error } = await supabase.from("components").insert({
      author_username: session.user.user_metadata.user_name,
      html_code: code,
      title: componentTitle,
    });

    if (error) {
      setLoading(false);
      return setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.editorContainer}>
      <div
        className={styles.codePreview}
        dangerouslySetInnerHTML={{ __html: code }}
      ></div>

      <Editor
        theme="vs-dark"
        height={300}
        defaultLanguage="html"
        defaultValue={code}
        onChange={(code) => setCode(code ?? "")}
        line={2}
      />
      {session?.user ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor={componentTitleInputID}>Component title</label>
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

          {loading ? (
            <Loader />
          ) : (
            <p>{error ? error : "Component published successfully"}</p>
          )}

          <button className={styles.publish_btn}>
            Publish component
            <img
              width={30}
              height={30}
              alt="publish component"
              src="/svg/share.svg"
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
          <img
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
