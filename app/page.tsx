import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button>
          <Link href="/patients/rsc">Go to patients (RSC)</Link>
        </Button>

        <Button>
          <Link href="/patients/rcc">Go to patients (Client-only)</Link>
        </Button>

        <Button>
          <Link href="/stripe/rsc">Go to Stripe (RSC)</Link>
        </Button>

        <Button>
          <Link href="/stripe/rsc-hide-page">
            Go to Stripe (RSC hide w/ Modal)
          </Link>
        </Button>

        <Button>
          <Link href="/admin">Admin panel</Link>
        </Button>
      </main>
    </div>
  );
}
