import { defineProtectParams } from "@clerk/nextjs";

// TODO: I'm sure I like this pattern
const canReadPatientsWithRedirect = defineProtectParams({
  permission: "org:patients:read",
  redirectUrl: "sign-in",
});

const canReadPatients = defineProtectParams({
  permission: "org:patients:read",
});

const canDeletePatients = defineProtectParams({
  permission: "org:patients:delete",
});

const witAssurace = defineProtectParams({
  assurance: {
    maxAge: "A0.1min",
    level: "L2.secondFactor",
  },
});

export {
  canReadPatients,
  canReadPatientsWithRedirect,
  canDeletePatients,
  witAssurace,
};
