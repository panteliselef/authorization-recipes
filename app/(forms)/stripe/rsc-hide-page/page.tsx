import { protect } from "@clerk/nextjs";
import React, { PropsWithChildren } from "react";

import { Toaster } from "sonner";
import { CreateAPIKeyButton } from "./create-api-key-button";

import { waitFor } from "@/lib/server";
import { APIKey, retrieveAllApiKeys, safeRetrieveAllApiKeys } from "@/lib/db/stripe";

import { APIKEYTableEntry } from "./list-item";

async function fetchApiKeys({ hideSufix = true }: { hideSufix: boolean }) {
  await waitFor();
  return hideSufix ? safeRetrieveAllApiKeys() : retrieveAllApiKeys();
}

const APIKeysTableShell = (props: { apiKeys: APIKey[] }) => {
  const { apiKeys } = props;

  return (
    <>
      <h1>Stripe API Keys:</h1>

      <ul>
        {apiKeys?.map((k) => (
          <APIKEYTableEntry apiKey={k} key={k.id} />
        ))}
      </ul>
    </>
  );
};

const APIKeysPage = () => {
  return (
    <>
      <Toaster richColors />
      <APIKeysTable>
        <CreateAPIKeyButton />
      </APIKeysTable>
    </>
  );
};


/**
 * Visit directly to see http://localhost:3000/stripe/rsc-hide-page
 */
const APIKeysTable = protect({
  assurance: {
    level: "L2.secondFactor",
    maxAge: "A0.1min",
  },
  fallback: "modal"
}).component(async (props: PropsWithChildren) => {
  const { children } = props;
  const keys = await fetchApiKeys({ hideSufix: false });

  return (
    <>
      <APIKeysTableShell apiKeys={keys} />
      {children}
    </>
  );
});

export default APIKeysPage;
