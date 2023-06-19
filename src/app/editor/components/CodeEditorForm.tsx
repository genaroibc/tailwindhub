import { Button } from "@/app/(with-header)/components/shared/Button";
import { Loader } from "@/app/(with-header)/components/shared/Loader/Loader";
import { useSupabase } from "@/hooks/useSupabase";
import { createComponent } from "@/services/create-component";
import { getImageDataURL } from "@/utils/get-image-data-url";
import { IconCrop, IconExclamationCircle, IconX } from "@tabler/icons-react";
import { useEffect, useId, useRef, useState } from "react";
import { ImageCropper } from "@/app/editor/components/ImageCropper";
import { LoginToPublishButton } from "@/app/editor/components/LoginToPublishButton";
import { TagsInput } from "@/app/editor/components/TagsInput";
import { CodePreviewRef, CodeEditorRef } from "@/app/editor/types";

type Props = {
  codeEditorRef: CodeEditorRef;
  codePreviewRef: CodePreviewRef;
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
  const tagsRef = useRef<string[]>([]);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [isCloningCodePreview, setIsCloningCodePreview] = useState(false);

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

    if (error) return;

    const code = codeEditorRef.current?.getValue();

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
    setIsCloningCodePreview(true);
    const clonedCodePreview = codePreviewRef?.current?.cloneNode(true);

    if (!clonedCodePreview || !(clonedCodePreview instanceof HTMLElement)) {
      setIsCloningCodePreview(false);
      return setError("There was an error cloning the code preview");
    }

    clonedCodePreview.style.position = "absolute";
    clonedCodePreview.style.zIndex = "500";
    clonedCodePreview.style.width = "100%";
    clonedCodePreview.style.maxWidth = "800px";
    clonedCodePreview.style.height = "auto";
    clonedCodePreview.style.aspectRatio = "1";

    document.body.appendChild(clonedCodePreview);

    const previewImg = await getImageDataURL(clonedCodePreview);

    if (!previewImg.ok) {
      setIsCloningCodePreview(false);
      return setError(previewImg.error);
    }

    setIsCloningCodePreview(false);
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const componentTitle = event.target.value;

    if (componentTitle.includes("-")) {
      return setError("component title cannot contain hyphens");
    }

    setError(null);
    setComponentTitle(componentTitle);
  };

  return (
    <div className={isCloningCodePreview ? "overflow-hidden" : ""}>
      <div
        id={modalBackdropID}
        onClick={handleBackdropClick}
        className={`${
          isOpen
            ? "bg-black/70 backdrop-blur-sm pointer-events-auto opacity-1 visible"
            : "bg-black/30 backdrop-blur-none pointer-events-none opacity-0 invisible"
        } block transition-all absolute top-0 left-0 right-0 bottom-0 z-10 shadow-2xl bg-black p-4`}
      >
        <div
          className={`${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform absolute top-0 right-0 bottom-0 left-0 sm:left-auto z-10 shadow-2xl bg-dimmed-black p-4 overflow-auto max-h-screen`}
        >
          {imageToCrop && (
            <div className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/70 backdrop-blur-sm shadow-2xl grid place-content-center">
              <ImageCropper
                onCropComplete={handleCropComplete}
                imageToCrop={imageToCrop}
              />
            </div>
          )}

          {isCloningCodePreview && (
            <div className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/70 backdrop-blur-sm shadow-2xl grid place-content-center">
              <p>Cloning code preview...</p>{" "}
            </div>
          )}

          <section className="text-primary-color sm:items-center w-full flex flex-col items-center gap-4">
            <div className="flex items-center justify-center w-64 aspect-square">
              {isGeneratingCodePreview ? (
                <Loader />
              ) : previewImageURL ? (
                <div className="group relative flex justify-center w-full">
                  <img
                    src={previewImageURL}
                    alt="Your component preview"
                    className="aspect-square w-full"
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
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                  <span className="text-sm text-gray-400">
                    There was an error generating the preview of your component
                  </span>
                </div>
              )}
            </div>
            <form
              className="flex flex-col items-center gap-4 max-w-xs"
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
                onChange={handleInputChange}
                className={`bg-red-100 border invalid:border-red-500 invalid:text-red-900 invalid:placeholder-red-700 placeholder:opacity-60 text-sm rounded-lg invalid:focus:ring-red-500 invalid:focus:border-red-500 valid:bg-green-100 valid:border-green-500 valid:text-green-900 valid:placeholder-green-700 valid:focus:ring-green-500 valid:focus:border-green-500 block w-full p-2.5 mb-4 ${
                  error != null
                    ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                    : ""
                }`}
                type="text"
                autoFocus
                name={componentTitleInputID}
                id={componentTitleInputID}
                placeholder="my awesome component"
                required
                minLength={5}
                maxLength={40}
              />

              <TagsInput onNewTags={({ tags }) => (tagsRef.current = tags)} />

              {error && (
                <p className="flex items-center gap-1 text-sm p-2 rounded border-2 border-red-300 bg-red-900 text-red-50">
                  <IconExclamationCircle size="1.2rem" />
                  {error}
                </p>
              )}

              <button
                disabled={loading}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 disabled:brightness-75"
              >
                <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 text-white">
                  {loading ? <Loader color="#fff" /> : <span>Publish</span>}
                </span>
              </button>
            </form>
          </section>
        </div>
      </div>

      <div className="w-fit fixed bottom-4 right-4 z-10">
        <LoginToPublishButton onClick={handleOpenForm}>
          Publish
        </LoginToPublishButton>
      </div>
    </div>
  );
}
