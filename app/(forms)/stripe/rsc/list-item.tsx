"use client";

import { APIKey } from "@/lib/db/stripe";
import Link from "next/link";

const APIKEYTableEntry = ({ apiKey }: { apiKey: APIKey }) => {
  return (
    <>
      <li>
        <Link href={`rsc/${apiKey.id}`} className="underline">
          {apiKey.value}
        </Link>
      </li>
    </>
  );
};

export { APIKEYTableEntry };
