"use client";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { protect, useAssurance } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";

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
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    `/api/patients/${name}`,
    (key) =>
      detect(() =>
        fetch(key, {
          method: "DELETE",
        })
      ),
    {
      onSuccess() {
        mutate("/api/patients");
      },
    }
  );

  return (
    <Button
      className="bg-red-700"
      disabled={isMutating}
      onClick={async () => {
        await trigger();
      }}
    >
      <LoadingChildren pending={isMutating} />
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
