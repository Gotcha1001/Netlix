// lib/getExpiresAt.ts
export function getExpiresAt(ttlSeconds: number) {
  return Math.floor(Date.now() / 1000) + ttlSeconds;
}
