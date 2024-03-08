import { UserRole } from "@prisma/client";
import type { User } from "next-auth";
import "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    // isOuth: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      role?: UserRole;
      isOuth: boolean;
    };
  }
}
