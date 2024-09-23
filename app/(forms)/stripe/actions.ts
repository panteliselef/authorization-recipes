"use server";

import { waitFor } from "@/lib/server";
import { APIKey, storeApiKey } from "@/lib/db/stripe";
import { defineProtectParams, protect } from "@clerk/nextjs";

const withAssurance = defineProtectParams({
  assurance: {
    level: "L2.secondFactor",
    maxAge: "A0.1min",
  },
});

export const createNewApiKey = protect(withAssurance).action(async () => {
  await waitFor();
  return storeApiKey();
});

export const readApiKey = protect(withAssurance).action(
  async (_, prevState: APIKey) => {
    await waitFor();

    return {
      ...prevState,
      value: "1212131" + prevState.value,
    };
  }
);
