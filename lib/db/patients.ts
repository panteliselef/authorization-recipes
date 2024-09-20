import { cookies } from "next/headers";

const getPatientNames = (orgId: string): string[] => {
  if (!cookies().has(`${orgId}_patients`)) return [];

  const commaString = cookies().get(`${orgId}_patients`)?.value || "";

  if (!commaString) {
    return [];
  }

  return commaString.split(",").map((a) => a.trim());
};

const removePatient = (patientName: string, orgId: string): void => {
  const newNameList = getPatientNames(orgId).filter(
    (thisName) => thisName !== patientName
  );

  const finalString =
    newNameList.length > 1 ? newNameList.join(",") : newNameList.join();

  if (newNameList.length !== 0) {
    cookies().set(`${orgId}_patients`, finalString);
  } else {
    cookies().delete(`${orgId}_patients`);
  }
};

export { getPatientNames, removePatient };
