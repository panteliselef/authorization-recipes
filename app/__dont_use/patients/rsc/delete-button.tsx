"use client";

import { Button } from "@/components/ui/button";
import { deletePatientAction } from "./actions";
import { startTransition, useActionState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export const DeletePatientButton = ({ name }: { name: string }) => {
  const [, trigger, isPending] = useActionState(
    (_, name: string) => {
      return deletePatientAction(name);
    },
    { sucess: true }
  );

  return (
    <Button
      className="bg-red-700"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await trigger(name);
        });
      }}
    >
      {isPending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        <>Delete</>
      )}
    </Button>
  );
};
