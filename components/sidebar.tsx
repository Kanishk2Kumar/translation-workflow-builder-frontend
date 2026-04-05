"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logOut } from "@/app/actions/auth"; // Adjust this import path if needed

export function Sidebar() {
  const pathname = usePathname();

  // Define your main navigation items
  const mainNavLinks = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Workflows", href: "/workflows", icon: "account_tree" },
    { name: "Agents", href: "/agents", icon: "smart_toy" },
    { name: "Files", href: "/uploads", icon: "folder" },
    { name: "Tools", href: "/tools", icon: "build" },
  ];

  // Define your organization settings items
  const settingsLinks = [
    { name: "Billing", href: "/billing", icon: "credit_card" },
    { name: "Members", href: "/members", icon: "group" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-[#111813] border-r border-border-dark shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 text-primary">
          <svg
            className="w-full h-full"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-base font-bold leading-none">
            Translatio
          </h1>
          <p className="text-[#9db9a6] text-xs font-normal mt-1">
            Admin Panel
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
        {/* Render Main Navigation */}
        {mainNavLinks.map((link) => {
          // Check if the current pathname starts with the link's href
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${
                isActive
                  ? "bg-[#28392e] text-white" // Active Styling
                  : "text-slate-400 hover:bg-surface-dark hover:text-white" // Inactive Styling
              }`}
            >
              <span
                className={`material-symbols-outlined group-hover:text-primary ${
                  isActive ? "text-white" : ""
                }`}
              >
                {link.icon}
              </span>
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          );
        })}

        <div className="mt-4 mb-2 px-3">
          <p className="text-xs font-semibold text-[#5e7a68] uppercase tracking-wider">
            Organization Settings
          </p>
        </div>

        {/* Render Settings Navigation */}
        {settingsLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${
                isActive
                  ? "bg-[#28392e] text-white"
                  : "text-slate-400 hover:bg-surface-dark hover:text-white"
              }`}
            >
              <span
                className={`material-symbols-outlined group-hover:text-primary ${
                  isActive ? "text-white" : ""
                }`}
              >
                {link.icon}
              </span>
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border-dark">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-dark border border-border-dark">
          <div
            className="w-8 h-8 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJbw7Bgjmw7HWukTZOyfRydDnKRD76QA_Be2_0Ur6DTNDX1f9BQVcjPUPWIkMf-PXf4WHuGHmTY8NpsjR0f6oaQ669BJJ6LjBZgJD_Z5lGRuqIzMRh0VwNGxuX6UIHMLs_HmJ9t72Z1lNmWMl_F17wv5dlTZMfPKghODB_55yxdt_Ka5hz1yabfdYRsJftS-kRWtOyXLfB_plOZPzpTGpS-efIJgPs7VoDZjWokQtZA0aQxQ8g7PiUDzbhpSeOvl49Skvrz4y23XU')",
            }}
          ></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Dr. Sarah C.
            </p>
            <p className="text-xs text-slate-400 truncate">Chief Admin</p>
          </div>

          {/* Logout functionality */}
          <form
            action={async () => {
              await logOut();
            }}
          >
            <button
              type="submit"
              className="flex items-center justify-center p-1 rounded-md hover:bg-[#28392e] transition-colors focus:outline-none"
              title="Logout"
            >
              <span className="material-symbols-outlined text-slate-400 text-lg cursor-pointer hover:text-red-400 transition-colors">
                logout
              </span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}