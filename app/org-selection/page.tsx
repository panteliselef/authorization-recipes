import { OrganizationList } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <h1>You need to be part of any organization to continue</h1>
      <OrganizationList hidePersonal />
    </>
  );
}
