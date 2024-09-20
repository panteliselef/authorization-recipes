declare global {
  interface ClerkAuthorization {
    permission: "org:patients:read" | "org:patients:delete";
    role: "org:admin" | "org:member"
  }
}

export {}
