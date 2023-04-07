import { Button } from "@/app/components/shared/Button";
import { CloseIcon } from "@/app/components/shared/Icons";
import { useSupabase } from "@/hooks/useSupabase";
import { useId, useRef, useState } from "react";
import { TagsInput } from "../TagsInput/TagsInput";

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
    <form
      className="flex items-center justify-center gap-4 bg-primary-color text-dimmed-black p-4 rounded-md"
      onSubmit={handleSubmit}
    >
      {isOpen ? (
        <>
          <label className="text-base" htmlFor={componentTitleInputID}>
            Title
          </label>
          <input
            onChange={(event) => setComponentTitle(event.target.value)}
            className="flex flex-col gap-2 py-2 px-4 rounded-md"
            type="text"
            name={componentTitleInputID}
            id={componentTitleInputID}
            placeholder="my awesome component"
            required
            minLength={5}
            maxLength={40}
          />

          <TagsInput onChange={({ tags }) => (tagsRef.current = tags)} />

          <Button variant="solid">Publish</Button>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            <CloseIcon width="1rem" />
          </Button>

          {error && <p>{error}</p>}
        </>
      ) : (
        <Button variant="solid" onClick={() => setIsOpen(true)}>
          Publish
        </Button>
      )}
    </form>
  );
}
