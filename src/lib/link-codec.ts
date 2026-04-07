export interface TerrorConfig {
  name: string; // 피해자 이름
  creator?: string; // 만든 사람 이름
}

function toBase64Url(str: string): string {
  if (typeof window !== "undefined") {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  return Buffer.from(str, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  if (typeof window !== "undefined") {
    return decodeURIComponent(escape(atob(base64)));
  }
  return Buffer.from(base64, "base64").toString("utf-8");
}

export function encodeTerrorConfig(config: TerrorConfig): string {
  return toBase64Url(JSON.stringify(config));
}

export function decodeTerrorConfig(id: string): TerrorConfig | null {
  try {
    const json = fromBase64Url(id);
    return JSON.parse(json) as TerrorConfig;
  } catch {
    return null;
  }
}
