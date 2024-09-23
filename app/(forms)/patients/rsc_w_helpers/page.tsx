import { DeletePatientButton } from "./delete-button";
import { getPatientNames } from "@/lib/db/patients";
import { waitFor } from "@/lib/server";
import { canReadPatientsWithRedirect } from "@/protect-recipes";
import { protect } from "@clerk/nextjs";

async function fetchPatients(orgId: string) {
  await waitFor();
  return getPatientNames(orgId);
}

const Page = protect(canReadPatientsWithRedirect).component(
  async ({ auth }) => {
    const patientNames = await fetchPatients(auth.orgId);

    return (
      <>
        <h1 className="text-2xl">All patients:</h1>
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
  }
);

export default Page;
