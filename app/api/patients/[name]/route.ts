import { removePatient } from "@/lib/db/patients";
import { waitFor } from "@/lib/server";
import { protect } from "@clerk/nextjs";

export const DELETE = protect({
  permission: "org:patients:delete",
})
  .protect({
    assurance: {
      level: "L2.secondFactor",
      maxAge: "A0.1min",
    },
  })
  .route(async (auth, req, { params }: { params: { name: string } }) => {
    console.log(req.url);
    await waitFor();

    removePatient(params.name, auth.orgId);

    return new Response(
      JSON.stringify({
        sucess: true,
      }),
      { status: 200 }
    );
  });
