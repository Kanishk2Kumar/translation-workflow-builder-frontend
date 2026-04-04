import React from "react";
import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize the Supabase server client
  const supabase = createClient();

  // Securely fetch the current user
  const { data, error } = await supabase.auth.getUser();

  // If there is an error fetching the user or no user exists, redirect to home
  if (error || !data?.user) {
    redirect("/");
  }

  // If the user is authenticated, render the dashboard layout
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-dark text-slate-100 font-display transition-colors duration-200">
      <Sidebar />
      {children}
    </div>
  );
}