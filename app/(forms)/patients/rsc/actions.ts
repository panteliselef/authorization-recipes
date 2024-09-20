"use server";

import { removePatient } from "@/lib/db/patients";
import { waitFor } from "@/lib/server";
import { protect } from "@clerk/nextjs";

export const deletePatientAction =
  // TODO: if this moved down we loose the typesafety
  protect({
    permission: "org:patients:delete",
  })
    .protect({
      assurance: {
        maxAge: "A0.1min",
        level: "L2.secondFactor",
      },
    })
    .action(async (auth, prevState: { sucess: boolean }, name: string) => {
      await waitFor();
      removePatient(name, auth.orgId);
      return { sucess: true };
    });
