export function encode(string: string) {
  return globalThis.encodeURIComponent(globalThis.btoa(string));
}

export function decode(string: string) {
  return globalThis.atob(globalThis.decodeURIComponent(string));
}
