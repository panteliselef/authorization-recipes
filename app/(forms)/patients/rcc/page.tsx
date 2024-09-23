"use client";

import { protect } from "@clerk/nextjs";
import useSWR from "swr";
import { DeletePatientButton } from "./delete-button";

const Page = protect({
  permission: "org:patients:read",
}).component(({ auth }) => {
  // TODO: maybe we don't need this for client components ?
  console.log(auth.orgId);
  const { data: patientNames } = useSWR("/api/patients", (key) => {
    return fetch(key).then(
      (res) => res.json() as Promise<{ patients: string[] }>
    );
  });

  return (
    <>
      <h1 className="text-2xl">All patients:</h1>

      <ul>
        {patientNames?.patients.map((name) => (
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
