import { Button } from "@/app/components/shared/Button";
import { Loader } from "@/app/components/shared/Loader/Loader";
import { useSupabase } from "@/hooks/useSupabase";
import { createComponent } from "@/services/create-component";
import { getImageDataURL } from "@/utils/get-image-data-url";
import {
  IconCrop,
  IconError404,
  IconExclamationCircle,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useId, useRef, useState } from "react";
import { ImageCropper } from "../ImageCropper";
import { LoginToPublishButton } from "../LoginToPublishButton/LoginToPublishButton";
import { TagsInput } from "../TagsInput/TagsInput";

type Props = {
  codeEditorRef: React.RefObject<HTMLDivElement> | null;
  codePreviewRef: React.RefObject<HTMLDivElement> | null;
};

const modalBackdropID = "modal-backdrop";

export function CodeEditorForm({ codeEditorRef, codePreviewRef }: Props) {
  const { supabase } = useSupabase();
  const [isOpen, setIsOpen] = useState(false);
  const [componentTitle, setComponentTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGeneratingCodePreview, setIsGeneratingCodePreview] = useState(false);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const componentTitleInputID = useId();
  const componentTagsInputID = useId();
  const tagsRef = useRef<string[]>([]);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);

  const generateCodePreview = async () => {
    const codePreview = codePreviewRef?.current;

    if (!codePreview) {
      return setError(
        "There was an error generating the preview of your component"
      );
    }

    setIsGeneratingCodePreview(true);
    const imageDataURLResponse = await getImageDataURL(codePreview);
    setIsGeneratingCodePreview(false);

    if (!imageDataURLResponse.ok) return setError(imageDataURLResponse.error);

    const { imageDataURL } = imageDataURLResponse.data;

    setPreviewImageURL(imageDataURL);
  };

  const handleOpenForm = async () => {
    setIsOpen(true);
    generateCodePreview();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // @ts-ignore
    const code = codeEditorRef?.current?.getValue();

    if (!previewImageURL) {
      return setError(
        "There was an error generating the preview of your component"
      );
    }

    if (!code) {
      return setError("There was an error retrieving the component code");
    }

    setLoading(true);
    const response = await createComponent({
      title: componentTitle,
      tags: tagsRef.current,
      html_code: code,
      preview_img: previewImageURL,
      supabase,
    });
    console.log({ response });
    setLoading(false);

    if (!response.ok) {
      return setError(response.error);
    }
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;

      if (event.key === "Escape") {
        event.stopPropagation();
        handleCloseForm();
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []);

  const handleBackdropClick = (event: React.MouseEvent) => {
    const clickedElementIsBackdrop = (
      event.target as HTMLDivElement
    )?.matches?.(`#${modalBackdropID}`);

    if (clickedElementIsBackdrop) {
      handleCloseForm();
    }
  };

  const handleEditPreviewImage = async () => {
    const clonedCodePreview = codePreviewRef?.current?.cloneNode(true);

    if (!clonedCodePreview || !(clonedCodePreview instanceof HTMLElement)) {
      return setError("There was an error cloning the code preview");
    }

    clonedCodePreview.style.position = "absolute";
    clonedCodePreview.style.zIndex = "500";
    clonedCodePreview.style.top = "2rem";
    clonedCodePreview.style.left = "2rem";
    clonedCodePreview.style.right = "2rem";
    clonedCodePreview.style.bottom = "2rem";
    clonedCodePreview.style.width = "100%";
    clonedCodePreview.style.height = "100%";

    document.body.appendChild(clonedCodePreview);

    const previewImg = await getImageDataURL(clonedCodePreview);

    if (!previewImg.ok) return setError(previewImg.error);

    setImageToCrop(previewImg.data.imageDataURL);
    document.body.removeChild(clonedCodePreview);
  };

  const handleCropComplete = (croppedImageURL: string) => {
    setImageToCrop(null);
    setPreviewImageURL(croppedImageURL);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
    setImageToCrop(null);
    setError(null);
  };

  return (
    <>
      {isOpen && (
        <div
          id={modalBackdropID}
          onClick={handleBackdropClick}
          className="absolute top-0 left-0 right-0 bottom-0 z-20 bg-black/70 backdrop-blur-sm shadow-2xl grid place-content-center"
        >
          {imageToCrop && (
            <div className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/70 backdrop-blur-sm shadow-2xl grid place-content-center">
              <ImageCropper
                onCropComplete={handleCropComplete}
                imageToCrop={imageToCrop}
              />
            </div>
          )}

          <section className="relative max-w-[100vw] bg-dimmed-black text-primary-color z-40 flex gap-4 rounded-md overflow-hidden shadow-2xl">
            <div className="flex flex-1 items-center justify-center w-64 aspect-square">
              {isGeneratingCodePreview ? (
                <Loader />
              ) : previewImageURL ? (
                <div className="group relative w-full flex items-center justify-center">
                  <img
                    src={previewImageURL}
                    alt="Your component preview"
                    className="aspect-square object-contain w-full"
                  />

                  <Button
                    onClick={handleEditPreviewImage}
                    variant="solid"
                    className="absolute bottom-2 right-2"
                  >
                    <IconCrop />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 justify-center items-center py-8 px-4 text-center">
                  <div className="max-w-[10rem]">
                    <IconError404 />
                  </div>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                </div>
              )}
            </div>
            <form
              className="flex flex-col items-center gap-4 py-8 px-4"
              onSubmit={handleSubmit}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleCloseForm();
                }}
                className="absolute top-0 right-0 bg-transparent p-4"
              >
                <IconX size="1rem" />
              </button>

              <label
                className="w-full text-base"
                htmlFor={componentTitleInputID}
              >
                Title
              </label>
              <input
                onChange={(event) => setComponentTitle(event.target.value)}
                className="bg-red-100 border invalid:border-red-500 invalid:text-red-900 invalid:placeholder-red-700 placeholder:opacity-60 text-sm rounded-lg invalid:focus:ring-red-500 invalid:focus:border-red-500 invalid:dark:bg-red-100 invalid:dark:border-red-400 valid:bg-green-100 valid:border-green-500 valid:text-green-900 valid:placeholder-green-700 valid:focus:ring-green-500 valid:focus:border-green-500 block w-full p-2.5 valid:dark:bg-green-100 valid:dark:border-green-400 mb-4"
                type="text"
                autoFocus
                name={componentTitleInputID}
                id={componentTitleInputID}
                placeholder="my awesome component"
                required
                minLength={5}
                maxLength={40}
              />

              <label
                className="w-full text-base"
                htmlFor={componentTagsInputID}
              >
                Tags
              </label>
              <TagsInput
                inputName={componentTagsInputID}
                onChange={({ tags }) => (tagsRef.current = tags)}
              />

              {error && (
                <p className="flex items-center gap-1 text-sm p-2 rounded border-2 border-red-300 bg-red-900 text-red-50">
                  <IconExclamationCircle size="1.2rem" />
                  {error}
                </p>
              )}

              <button
                disabled={loading}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 disabled:brightness-75"
              >
                <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 text-white">
                  {loading ? <Loader color="#fff" /> : <span>Publish</span>}
                </span>
              </button>
            </form>
          </section>
        </div>
      )}
      <div className="w-fit fixed bottom-4 right-4 z-10">
        <LoginToPublishButton onClick={handleOpenForm}>
          Publish
        </LoginToPublishButton>
      </div>
    </>
  );
}
