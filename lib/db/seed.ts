"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const seedPatients = (orgId: string) => {
  cookies().set(
    `${orgId}_patients`,
    "John Smith, Emily Johnson, Michael Williams, Jessica Brown, David Jones, Sarah Miller, Matthew Davis, Ashley Wilson, Christopher Taylor, Megan Anderson."
  );

  redirect("/");
};
