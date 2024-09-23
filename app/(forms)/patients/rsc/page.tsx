import { DeletePatientButton } from "./delete-button";
import { getPatientNames } from "@/lib/db/patients";
import { waitFor } from "@/lib/server";
import { protect } from "@clerk/nextjs";

async function fetchPatients(orgId: string) {
  await waitFor();
  return getPatientNames(orgId);
}

const Page = protect({
  redirectUrl: "sign-in",
})
  // TODO: if this moved down we loose the typesafety
  .protect({
    permission: "org:patients:read",
  })

  .component(async ({ auth }) => {
    //@ts-expect-error orgId types are wrong
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
  });

export default Page;
