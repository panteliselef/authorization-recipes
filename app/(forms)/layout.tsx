import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="bg-slate-200 text-zinc-900">
        <Link href={"/"}>Home</Link>
      </header>

      {children}
    </>
  );
}
