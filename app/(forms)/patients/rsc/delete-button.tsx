"use client";

import { Button } from "@/components/ui/button";
import { deletePatientAction } from "./actions";
import { startTransition, useActionState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { protect, useAssurance } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function DisabledButtonWithFeedback() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Delete</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>You don not have permissions for this action</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const DeletePatientButton = protect({
  permission: "org:patients:delete",
  fallback: DisabledButtonWithFeedback,
}).component(({ name }: { name: string }) => {
  const { detect } = useAssurance();

  const [, trigger, isPending] = useActionState(detect(deletePatientAction), {
    sucess: true,
  });

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
      <LoadingChildren pending={isPending} />
    </Button>
  );
});

function LoadingChildren({ pending }: { pending: boolean }) {
  if (pending) {
    return (
      <>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </>
    );
  }

  return <>Delete</>;
}
