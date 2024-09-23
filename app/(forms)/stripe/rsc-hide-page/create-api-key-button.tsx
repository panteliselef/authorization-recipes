"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useAssurance } from "@clerk/clerk-react";
import { toast } from "sonner";
import { createNewApiKey } from "../actions";

export function CreateAPIKeyButton() {
  const { detect } = useAssurance();
  const [pending, startTransition] = useTransition();
  return (
    <Button
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          /**
           * TODO: Do i need to fix these types, detect says it returns only the original type and removes the Clerk error. Is this realistic ?
           */
          const run = detect(() => createNewApiKey());
          const key = await run();

          if (typeof key !== "string") {
            toast.error("Cancelled");
          } else {
            toast.success("New key created");
          }
        });
      }}
    >
      Create Key {pending && `(Loading...)`}
    </Button>
  );
}
