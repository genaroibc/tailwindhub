export function sluglify(text: string) {
  return text.replaceAll(" ", "-");
}

export function unsluglify(text: string) {
  return text.replaceAll("-", " ");
}
