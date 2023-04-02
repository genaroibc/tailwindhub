import { useSupabase } from "@/hooks/useSupabase";
import { useId, useRef, useState } from "react";
import { TagsInput } from "../TagsInput/TagsInput";
import styles from "./CodeEditorForm.module.css";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: { title: string; tags: string[] }) => void;
};

export function CodeEditorForm({ onSubmit }: Props) {
  const { supabase } = useSupabase();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [componentTitle, setComponentTitle] = useState("");
  const componentTitleInputID = useId();
  const tagsRef = useRef<string[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return setError("you must be logged in to publish");

    onSubmit({ title: componentTitle, tags: tagsRef.current });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isOpen ? (
        <>
          <label className={styles.label} htmlFor={componentTitleInputID}>
            Title
          </label>
          <input
            onChange={(event) => setComponentTitle(event.target.value)}
            className={styles.input}
            type="text"
            name={componentTitleInputID}
            id={componentTitleInputID}
            placeholder="my awesome component"
            required
            minLength={5}
            maxLength={40}
          />

          <TagsInput onChange={({ tags }) => (tagsRef.current = tags)} />

          <button className={styles.publish_btn}>Publish</button>
          <button
            className={styles.close_form_button}
            onClick={() => setIsOpen(false)}
          >
            x
          </button>

          {error && <p>{error}</p>}
        </>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={styles.form__open_form_button}
        >
          Publish
        </button>
      )}
    </form>
  );
}
