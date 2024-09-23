"use server";

import { removePatient } from "@/lib/db/patients";
import { waitFor } from "@/lib/server";

export const deletePatientAction = async (name: string) => {
  await waitFor();
  // @ts-expect-error this is old
  removePatient(name);

  return { sucess: true };
};
