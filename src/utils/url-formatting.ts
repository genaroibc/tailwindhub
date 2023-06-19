export function sluglify(text: string) {
  return text.replaceAll(/[\s]/g, "-");
}

export function unsluglify(text: string) {
  return text.replaceAll(/[\s]/g, "-");
}
