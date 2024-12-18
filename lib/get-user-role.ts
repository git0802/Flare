import "server-only";

import { JWTPayload, jwtVerify } from "jose";

import { createClient } from "./supabase/server";

type SupabaseJwtPayload = JWTPayload & {
  app_metadata: {
    role: string;
  };
};

export async function getUserRole() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let role;

  if (session) {
    const token = session.access_token;

    try {
      const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);

      const { payload } = await jwtVerify<SupabaseJwtPayload>(token, secret);

      role = payload.app_metadata.role;
    } catch (error) {
      console.error("Faild to verify token:", error);
    }
  }

  return role;
}
