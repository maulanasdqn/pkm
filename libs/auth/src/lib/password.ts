"use server";
import * as argon2 from "argon2-wasm-edge";

export const hashPassword = async (password: string) => {
  const salt = new Uint8Array(16);
  const hashedPassword = await argon2.argon2id({
    parallelism: 1,
    iterations: 256,
    memorySize: 512,
    hashLength: 32,
    outputType: "encoded",
    password,
    salt,
  });
  return hashedPassword;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  const isValid = await argon2.argon2Verify({
    password,
    hash: hashedPassword,
  });
  return isValid;
};
