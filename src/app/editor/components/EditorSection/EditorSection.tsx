"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { CodeEditor } from "@/app/editor/components/CodeEditor/CodeEditor";
import { useRef, useState } from "react";
import { uploadImageToCloudinary } from "@/services/upload-image-to-cloudinary";
import { CodeEditorForm } from "../CodeEditorForm/CodeEditorForm";
import { getImageDataURL } from "@/utils/get-image-data-url";

export function EditorSection() {
  const { supabase } = useSupabase();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const codePreviewRef = useRef(null);
  const codeEditorRef = useRef(null);

  const handleCreateComponent = async ({
    title,
    tags,
  }: {
    title: string;
    tags: string[];
  }) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return setError("you must be logged in to publish");

    const { current: codePreview } = codePreviewRef;
    const { current: codeEditor } = codeEditorRef;

    if (!codePreview || !codeEditor)
      return setError("There was an error creating your component");

    // @ts-ignore
    const code = codeEditor.getValue();
    // @ts-ignore
    const imageDataURLResponse = await getImageDataURL(codePreview);

    if (!imageDataURLResponse.ok) return setError(imageDataURLResponse.error);

    setLoading(true);

    try {
      const { imageDataURL } = imageDataURLResponse.data;

      const response = await uploadImageToCloudinary({
        imageDataURL,
      });

      if (!response.ok) return setError(response.error);

      const { error } = await supabase.from("components").insert({
        author_username: session.user.user_metadata.user_name,
        html_code: code,
        title,
        preview_img: response.data?.url,
        author_avatar_url: session.user.user_metadata.avatar_url,
        tags,
      });

      if (error) {
        return setError(error.message);
      }
    } catch (error) {
      setError("there was an error generating the image of your component");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full w-full flex flex-col items-stretch justify-stretch relative">
      <CodeEditorForm
        onSubmit={({ title, tags }) => handleCreateComponent({ title, tags })}
        error={error}
        loading={loading}
      />

      <CodeEditor
        codeEditorRef={codeEditorRef}
        codePreviewRef={codePreviewRef}
      />
    </section>
  );
}
