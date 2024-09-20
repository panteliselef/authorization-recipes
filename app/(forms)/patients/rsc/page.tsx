import { DeletePatientButton } from "./delete-button";
import { getPatientNames } from "@/lib/db/patients";
import { waitFor } from "@/lib/server";
import { protect } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

export async function fetchPatients(orgId: string) {
  await waitFor();
  return getPatientNames(orgId);
}

const Page = protect({
  permission: "org:patients:read",
}).component<PropsWithChildren>(async ({ children, auth }) => {
  const patientNames = await fetchPatients(auth.orgId);

  return (
    <>
      <h1 className="text-2xl">All patients:</h1>
      {children}
      <ul>
        {patientNames.map((name) => (
          <li key={name}>
            {name}

            <DeletePatientButton name={name} />
          </li>
        ))}
      </ul>
    </>
  );
});

export default Page;
