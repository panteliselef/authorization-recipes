import { getPatientNames } from "@/lib/db/patients";
import { waitFor } from "@/lib/server";
import { protect } from "@clerk/nextjs";

// export const DELETE = protect({
//   permission: "org:patients:delete",
// })
//   .protect({
//     assurance: {
//       level: "L2.secondFactor",
//       maxAge: "A0.1min",
//     },
//   })

//   //TODO: Support ctx argument { params }: { params: { patientId: string } }
//   .route(async (auth, req) => {
//     console.log(req.url);
//     await waitFor();
//     const patients = getPatientNames(auth, orgId);
//     return new Response(
//       JSON.stringify({
//         patients,
//       }),
//       { status: 200 }
//     );
//   });

export const GET = protect({ permission: "org:patients:read" }).route(
  async (auth, req) => {
    console.log(req.url);
    await waitFor();
    const patients = getPatientNames(auth.orgId);
    return new Response(
      JSON.stringify({
        patients,
      }),
      { status: 200 }
    );
  }
);
