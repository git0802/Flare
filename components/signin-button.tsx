"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";

export function SignInButton() {
  const pathname = usePathname();

  return pathname !== "/signin" ? (
    <Link
      href="/signin"
      className={cn(
        buttonVariants({
          variant: "secondary",
          size: "sm",
        })
      )}
    >
      <Icons.logIn className="mr-2 size-3.5" />
      Sign in
    </Link>
  ) : null;
}
