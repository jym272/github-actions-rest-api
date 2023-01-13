import * as dotenv from 'dotenv';
dotenv.config();

export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const successConnectionMsg = (msg: string) => {
  // eslint-disable-next-line no-console
  console.log('\x1b[32m%s\x1b[0m', msg);
};
