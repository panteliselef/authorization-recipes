"use server";

import { removePatient } from "@/lib/db/patients";
import { waitFor } from "@/lib/server";
import { canDeletePatients, witAssurace } from "@/protect-recipes";
import { protect } from "@clerk/nextjs";

export const deletePatientAction =
  // TODO: if this moved down we loose the typesafety
  protect(canDeletePatients)
    .protect(witAssurace)
    .action(async (auth, prevState: { sucess: boolean }, name: string) => {
      await waitFor();
      removePatient(name, auth.orgId);
      return { sucess: true };
    });
