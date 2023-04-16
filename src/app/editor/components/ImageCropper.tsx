import { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";

import { getCanvasPreview } from "@/utils/get-canvas-preview";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import { IconCheck } from "@tabler/icons-react";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

type Props = {
  // eslint-disable-next-line no-unused-vars
  onCropComplete: (imageURL: string) => void;
  imageToCrop: string;
  aspect?: number;
};

export function ImageCropper({
  imageToCrop,
  onCropComplete,
  aspect = 1,
}: Props) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const blobUrlRef = useRef<string>("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      onCropComplete(blobUrlRef.current);
    });
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        getCanvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop
        );
      }
    },
    100,
    [completedCrop]
  );

  return (
    <section className="grid place-content-center grid-cols-2 gap-2 bg-slate-900 text-white max-h-screen max-w-xl mx-auto p-4">
      {imageToCrop && (
        <div className="flex-1">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            className="w-full max-w-xs h-auto"
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imageToCrop}
              onLoad={onImageLoad}
              className="ẁ-full h-full"
            />
          </ReactCrop>
        </div>
      )}
      {completedCrop && (
        <section className="flex flex-col gap-2 items-center justify-between flex-grow-0 relative">
          <canvas
            ref={previewCanvasRef}
            className="object-contain mx-auto my-0 w-full"
          />
          <button
            className="w-fit absolute bottom-4 right-4"
            onClick={onDownloadCropClick}
          >
            <IconCheck />
          </button>
        </section>
      )}
    </section>
  );
}
