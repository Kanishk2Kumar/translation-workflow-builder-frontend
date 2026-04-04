import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize the Supabase server client
  const supabase = createClient();

  // Securely fetch the current user
  const { data } = await supabase.auth.getUser();

  // If a user is already logged in, redirect them away from the auth pages
  if (data?.user) {
    redirect("/dashboard");
  }

  // If no user is logged in, simply render the login/signup page
  return (
    <>
      {children}
    </>
  );
}