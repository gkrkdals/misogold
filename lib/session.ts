import crypto from "crypto";

let encryptionKey: Buffer | null = null;

function getEncryptionKey(): Buffer {
  if (encryptionKey) return encryptionKey;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not defined in environment variables.");
  }

  // Ensure key is exactly 32 bytes for aes-256-cbc
  const key = Buffer.alloc(32);
  Buffer.from(secret, "utf-8").copy(key);
  encryptionKey = key;
  return key;
}

const IV_LENGTH = 16; // AES IV size

export function encryptSession(data: Record<string, unknown>): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decryptSession(text: string): Record<string, unknown> | null {
  try {
    const key = getEncryptionKey();
    const textParts = text.split(":");
    const ivHex = textParts.shift();
    if (!ivHex) return null;
    
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    const parsed = JSON.parse(decrypted.toString("utf8"));
    
    // Check if session has expired
    if (parsed.exp && parsed.exp < Date.now()) {
      return null;
    }
    
    return parsed;
  } catch {
    return null;
  }
}
