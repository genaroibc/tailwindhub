import { useSupabase } from "@/hooks/useSupabase";
import { useId, useState } from "react";
import styles from "./CodeEditorForm.module.css";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: { title: string }) => void;
};

export function CodeEditorForm({ onSubmit }: Props) {
  const { supabase } = useSupabase();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [componentTitle, setComponentTitle] = useState("");
  const componentTitleInputID = useId();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return setError("you must be logged in to publish");

    onSubmit({ title: componentTitle });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isOpen ? (
        <>
          <label className={styles.label} htmlFor={componentTitleInputID}>
            Component title
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

          <button className={styles.publish_btn}>Publish</button>
          <button onClick={() => setIsOpen(false)}>x</button>

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
