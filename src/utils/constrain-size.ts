import { Size } from "@/app/editor/types";

type Params = {
  desiredWidth: number;
  desiredHeight: number;
  size: Size;
};

export function constrainSize({ desiredHeight, desiredWidth, size }: Params) {
  const { width, zoom: widthZoom } = constrainWidth({
    desiredDimension: desiredWidth,
    size,
  });
  const { height, zoom: heightZoom } = constrainHeight({
    desiredDimension: desiredHeight,
    size,
  });
  return {
    width,
    height,
    zoom: Math.min(widthZoom, heightZoom),
  };
}

type ConstrainDimensionParams = {
  desiredDimension: number;
  size: Size;
};

function constrainWidth({ desiredDimension, size }: ConstrainDimensionParams) {
  const zoom =
    desiredDimension > size.width - 34
      ? (size.width - 34) / desiredDimension
      : 1;
  return {
    width: Math.min(
      Math.max(50, Math.round(desiredDimension * (1 / zoom))),
      Math.round((size.width - 34) * (1 / zoom))
    ),
    zoom,
  };
}

function constrainHeight({ desiredDimension, size }: ConstrainDimensionParams) {
  const zoom =
    desiredDimension > size.height - 17 - 40
      ? (size.height - 17 - 40) / desiredDimension
      : 1;
  return {
    height: Math.min(
      Math.max(50, Math.round(desiredDimension * (1 / zoom))),
      Math.round((size.height - 17 - 40) * (1 / zoom))
    ),
    zoom,
  };
}
