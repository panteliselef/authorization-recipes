"use client";

import { Button } from "@/components/ui/button";
import { seedPatients } from "@/lib/db/seed";
import { useAuth } from "@clerk/nextjs";

export default function Page() {
  const { orgId } = useAuth();
  return (
    <>
      <Button
        onClick={async () => {
          await seedPatients(orgId!);
        }}
      >
        Seed DB
      </Button>
    </>
  );
}
