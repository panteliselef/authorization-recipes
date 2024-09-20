import { DeletePatientButton } from "./delete-button";
import { getPatientNames } from "@/lib/db/patients";
import { waitFor } from "@/lib/server";

export async function fetchPatients() {
  await waitFor();
  return getPatientNames();
}

export default async function Page() {
  const patientNames = await fetchPatients();

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
