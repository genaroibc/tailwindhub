import { encode as encodeBase64, decode as decodeBase64 } from "js-base64";

export function encode(string: string) {
  return globalThis.encodeURIComponent(encodeBase64(string ?? ""));
}

export function decode(string: string) {
  return decodeBase64(globalThis.decodeURIComponent(string ?? ""));
}
