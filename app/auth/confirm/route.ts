import { createClient } from "@/utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = "/account";

  const redirecTo = request.nextUrl.clone();
  redirecTo.pathname = next;
  redirecTo.searchParams.delete("token_hash");
  redirecTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      redirecTo.searchParams.delete("next");
      return NextResponse.redirect(redirecTo);
    }
  }

  redirecTo.pathname = "/error";
  return NextResponse.redirect(redirecTo);
}
