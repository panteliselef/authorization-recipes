"use client";

import { useAssurance } from "@clerk/nextjs";
import { startTransition, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { APIKey } from "@/lib/db/stripe";
import { readApiKey } from "../actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidValue(v: any): v is APIKey {
  if ("id" in v && "value" in v) {
    return true;
  }
  return false;
}

const APIKEYTableEntry = ({ apiKey }: { apiKey: APIKey }) => {
  const { detect } = useAssurance();
  const [state, fetch] = useActionState(async (prevState: APIKey) => {
    const run = detect(readApiKey);

    const res = await run(prevState);

    if (isValidValue(res)) {
      return res;
    }

    return prevState;
  }, apiKey);

  return (
    <>
      <li>
        {isValidValue(state) && state.value}

        <Button
          onClick={() =>
            startTransition(async () => {
              await fetch();
            })
          }
        >
          {" "}
          Reveal{" "}
        </Button>
      </li>
    </>
  );
};

export { APIKEYTableEntry };
