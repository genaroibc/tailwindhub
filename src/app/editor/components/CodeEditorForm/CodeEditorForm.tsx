import { Button } from "@/app/components/shared/Button";
import { CloseIcon } from "@/app/components/shared/Icons";
import { Loader } from "@/app/components/shared/Loader/Loader";
import { useEffect, useId, useRef, useState } from "react";
import { TagsInput } from "../TagsInput/TagsInput";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: { title: string; tags: string[] }) => void;
  error: string;
  loading: boolean;
};

const modalBackdropID = "modal-backdrop";

export function CodeEditorForm({ onSubmit, error, loading }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [componentTitle, setComponentTitle] = useState("");
  const componentTitleInputID = useId();
  const tagsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const listener = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;

      if (event.key === "Escape") {
        event.stopPropagation();
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    const clickedElementIsBackdrop = (event.target as HTMLDivElement).matches(
      `#${modalBackdropID}`
    );
    console.log("click in backdrop");

    setIsOpen(!clickedElementIsBackdrop);
  };

  return (
    <>
      {isOpen && (
        <div
          id={modalBackdropID}
          onClick={handleBackdropClick}
          className="absolute top-0 left-0 right-0 bottom-0 z-20 bg-black/60 backdrop-blur-sm shadow-2xl"
        >
          <form
            className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-dimmed-black text-primary-color -translate-y-1/2 flex flex-col p-8 items-center gap-4 rounded-md z-40"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit({ title: componentTitle, tags: tagsRef.current });
            }}
          >
            <label className="text-base" htmlFor={componentTitleInputID}>
              Title
            </label>
            <input
              onChange={(event) => setComponentTitle(event.target.value)}
              className="flex flex-col gap-2 py-2 px-4 rounded-md"
              type="text"
              autoFocus
              name={componentTitleInputID}
              id={componentTitleInputID}
              placeholder="my awesome component"
              required
              minLength={5}
              maxLength={40}
            />

            <TagsInput onChange={({ tags }) => (tagsRef.current = tags)} />

            <button
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-4 right-4 bg-transparent"
            >
              <CloseIcon width="1rem" fill={"var(--primary-color, white)"} />
            </button>

            {error && <p>{error}</p>}
            {loading && <Loader />}

            <Button type="submit" variant="solid">
              Publish
            </Button>
          </form>
        </div>
      )}

      <Button
        className="w-fit fixed bottom-4 right-4 z-10"
        variant="solid"
        onClick={() => setIsOpen(true)}
      >
        Publish
      </Button>
    </>
  );
}
