import {
  argon2,
  randomBytes,
  timingSafeEqual,
  type Argon2Algorithm,
} from "node:crypto";
import { promisify } from "node:util";

const argon2Async = promisify(argon2);

export const argon2idHash = async (password: string) => {
  const nonce = randomBytes(16);
  const variant: Argon2Algorithm = "argon2id";
  const memorySize = 19456;
  const iterations = 2;
  const parallelism = 1;

  const hash = await argon2Async(variant, {
    message: password,
    nonce: nonce,
    parallelism: parallelism,
    tagLength: 32,
    memory: memorySize,
    passes: iterations,
  });

  const nonceB64 = nonce.toString("base64").replace(/=/g, "");
  const hashB64 = hash.toString("base64").replace(/=/g, "");

  return `$${variant}$v=19$m=${memorySize},t=${iterations},p=${parallelism}$${nonceB64}$${hashB64}`;
};

export const argon2idVerify = async (data: {
  password: string;
  hash: string;
}): Promise<boolean> => {
  const parts = data.hash.split("$");
  if (parts.length !== 6) return false;

  const variant = parts[1] as Argon2Algorithm;

  const params = parts[3].split(",").reduce(
    (acc, curr) => {
      const [key, value] = curr.split("=");
      acc[key] = parseInt(value, 10);
      return acc;
    },
    {} as Record<string, number>,
  );

  const pad = (b64: string) =>
    b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), "=");

  const nonce = Buffer.from(pad(parts[4]), "base64");
  const originalHash = Buffer.from(pad(parts[5]), "base64");

  try {
    const newHash = await argon2Async(variant, {
      message: data.password,
      nonce: nonce,
      parallelism: params.p,
      tagLength: originalHash.length,
      memory: params.m,
      passes: params.t,
    });

    if (originalHash.length !== newHash.length) return false;
    return timingSafeEqual(originalHash, newHash);
  } catch (e) {
    console.error("Argon2 verification failed:", e);
    return false;
  }
};
