import { cookies } from "next/headers";
import crypto from "crypto";

export const n = "clerk_stripe_keys";

export const oneDay = 24 * 60 * 60 * 1000;

export type APIKey = {
  id: string;
  value: string;
};

const retrieveAllApiKeys = (): APIKey[] => {
  const kString =
    cookies()
      .get(n)
      ?.value.split(";")
      .filter((k) => k.length > 1) || [];

  return kString.map((k) => {
    const [id, value] = k.split("_");

    return {
      id,
      value,
    };
  });
};

const safeRetrieveAllApiKeys = (): APIKey[] => {
  const keys = retrieveAllApiKeys();

  return keys.map(({ id, value }) => {
    return {
      id,
      value: value.slice(0, 4) + "*".repeat(value.length - 4),
    };
  });
};

const storeApiKey = (): APIKey => {
  const id = crypto.randomBytes(4).toString("hex");
  const value = crypto.randomBytes(8).toString("hex");
  const oldValue = cookies().get(n)?.value || "";

  cookies().set({
    name: n,
    value: oldValue + ";" + `${id}_${value}`,
    expires: Date.now() + oneDay,
    secure: true,
    httpOnly: false,
    domain: "localhost",
    sameSite: "none",
  });

  return {
    id,
    value,
  };
};

export { safeRetrieveAllApiKeys, retrieveAllApiKeys, storeApiKey };
