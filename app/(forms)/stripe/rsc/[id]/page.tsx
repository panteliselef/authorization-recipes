import { retrieveAllApiKeys } from "@/lib/db/stripe";
import { protect } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
};

const Page = protect({
  assurance: {
    level: "L2.secondFactor",
    maxAge: "A1.10min",
  },
  fallback: "modal",
}).component<PageProps>(({ params }) => {
  const { id } = params;

  const key = retrieveAllApiKeys().find((item) => item.id === id);

  if (!key) {
    redirect("rsc");
  }

  return (
    <>
      <h1 className="text-2xl">{key.value}</h1>
      {/* TODO: DO a delete */}
    </>
  );
});

export default Page;
