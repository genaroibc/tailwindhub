type PointerEvent =
  | TouchEvent
  | MouseEvent
  | React.TouchEvent
  | React.MouseEvent;

export function getPointerPosition(event: PointerEvent) {
  if (event instanceof TouchEvent) {
    if (event.targetTouches.length !== 1) return null;

    return {
      x: event.targetTouches[0].clientX,
      y: event.targetTouches[0].clientY,
    };
  }

  return { x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY };
}
