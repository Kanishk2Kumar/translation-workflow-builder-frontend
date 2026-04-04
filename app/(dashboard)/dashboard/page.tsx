"use client";

import { useState, useRef, useEffect } from "react";
import { PerformanceMetricsChart } from "@/components/dashboard/performance-metrics";
import { logOut } from "@/app/actions/auth"; // Adjust this import path to match where you saved the auth actions

export default function ProviderDashboardPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if the user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-dark">
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border-dark bg-[#111813]">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-white rounded-lg hover:bg-surface-dark">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Provider Monitoring
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400">search</span>
            </div>
            <input
              className="block w-64 pl-10 pr-3 py-2 border border-border-dark rounded-lg leading-5 bg-surface-dark text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
              placeholder="Search providers, agents..."
              type="text"
            />
          </div>
          
          {/* Settings Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 text-slate-300 hover:text-primary transition-colors focus:outline-none rounded-lg"
              aria-expanded={isSettingsOpen}
              aria-haspopup="true"
            >
              <span className="material-symbols-outlined">settings</span>
            </button>

            {/* Dropdown Menu */}
            {isSettingsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#111813] border border-border-dark rounded-xl shadow-2xl z-50 overflow-hidden transform opacity-100 scale-100 transition-all duration-200">
                <a 
                  href="/profile" 
                  className="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-[#1c2e24] hover:text-white transition-colors border-b border-border-dark"
                >
                  <span className="material-symbols-outlined text-[18px] mr-3">person</span>
                  Update Profile
                </a>
                <form action={async () => { await logOut(); }}>
                  <button 
                    type="submit" 
                    className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-400 hover:bg-[#1c2e24] hover:text-red-300 transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-[18px] mr-3">logout</span>
                    Logout
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Stat Card 1 */}
          <div className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-blue-900/20 text-blue-400">
                <span className="material-symbols-outlined">record_voice_over</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400">
                +2 agents
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-400">
              Active Voice Agents
            </h3>
            <p className="mt-2 text-3xl font-bold text-white">12</p>
          </div>
          
          {/* Stat Card 2 */}
          <div className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-primary/20 text-primary">
                <span className="material-symbols-outlined">call</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400">
                +15%
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-400">
              Total Calls (24h)
            </h3>
            <p className="mt-2 text-3xl font-bold text-white">1,450</p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-amber-900/20 text-amber-400">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                +2.1%
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-400">
              Avg Risk Score
            </h3>
            <p className="mt-2 text-3xl font-bold text-white">12.4%</p>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-purple-900/20 text-purple-400">
                <span className="material-symbols-outlined">gpp_good</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                -0.5%
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-400">
              Compliance Status
            </h3>
            <p className="mt-2 text-3xl font-bold text-white">98.2%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8" suppressHydrationWarning>
          <PerformanceMetricsChart />
          {/* Recent Workflows */}
          <div className="bg-surface-dark rounded-xl border border-border-dark shadow-sm p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Recent Workflows</h3>
              <a className="text-sm text-primary font-medium hover:underline" href="#">View All</a>
            </div>
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
              {/* Workflow Item 1 */}
              <div className="p-4 rounded-lg bg-[#111813] border border-border-dark flex items-center justify-between group hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400">
                    <span className="material-symbols-outlined text-[20px]">medical_services</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Patient Intake V2</h4>
                    <p className="text-xs text-slate-400">Updated 2m ago</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800">
                  Running
                </span>
              </div>
              
              {/* Workflow Item 2 */}
              <div className="p-4 rounded-lg bg-[#111813] border border-border-dark flex items-center justify-between group hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-900/30 flex items-center justify-center text-orange-400">
                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Appointment Set</h4>
                    <p className="text-xs text-slate-400">Updated 45m ago</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600">
                  Draft
                </span>
              </div>

              {/* Workflow Item 3 */}
              <div className="p-4 rounded-lg bg-[#111813] border border-border-dark flex items-center justify-between group hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400">
                    <span className="material-symbols-outlined text-[20px]">emergency</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Emergency Triage</h4>
                    <p className="text-xs text-slate-400">Updated 2h ago</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400 border border-red-800">
                  Error
                </span>
              </div>

              {/* Workflow Item 4 */}
              <div className="p-4 rounded-lg bg-[#111813] border border-border-dark flex items-center justify-between group hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400">
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Billing Inquiry</h4>
                    <p className="text-xs text-slate-400">Updated 5h ago</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800">
                  Running
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Detailed Logs */}
        <div className="bg-surface-dark rounded-xl border border-border-dark shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-border-dark flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-white">Live Call Logs</h3>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm font-medium text-slate-300 bg-[#111813] border border-border-dark rounded-lg hover:bg-[#28392e]">
                Filter
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-primary/20">
                Export Data
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-[#111813] text-xs uppercase font-semibold text-slate-300">
                <tr>
                  <th className="px-6 py-4" scope="col">Status</th>
                  <th className="px-6 py-4" scope="col">Patient ID</th>
                  <th className="px-6 py-4" scope="col">Agent Name</th>
                  <th className="px-6 py-4" scope="col">Duration</th>
                  <th className="px-6 py-4" scope="col">Sentiment</th>
                  <th className="px-6 py-4 text-right" scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark">
                {/* Table Row 1 */}
                <tr className="hover:bg-[#1c2e24] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                      <span className="text-white font-medium">Active</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">#PT-8832</td>
                  <td className="px-6 py-4 whitespace-nowrap">Intake Bot Alpha</td>
                  <td className="px-6 py-4 whitespace-nowrap">04:12</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-900/20 text-emerald-400">Positive</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-primary hover:text-emerald-400 font-medium">Listen</button>
                  </td>
                </tr>
                {/* Table Row 2 */}
                <tr className="hover:bg-[#1c2e24] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300 mr-2"></span>
                      <span className="text-white font-medium">Completed</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">#PT-8831</td>
                  <td className="px-6 py-4 whitespace-nowrap">Billing Support</td>
                  <td className="px-6 py-4 whitespace-nowrap">01:45</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300">Neutral</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-primary hover:text-emerald-400 font-medium">Details</button>
                  </td>
                </tr>
                {/* Table Row 3 */}
                <tr className="hover:bg-[#1c2e24] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></span>
                      <span className="text-white font-medium">Flagged</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">#PT-8830</td>
                  <td className="px-6 py-4 whitespace-nowrap">Emergency Triage</td>
                  <td className="px-6 py-4 whitespace-nowrap">08:23</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-900/20 text-red-400">Negative</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-primary hover:text-emerald-400 font-medium">Review</button>
                  </td>
                </tr>
                {/* Table Row 4 */}
                <tr className="hover:bg-[#1c2e24] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300 mr-2"></span>
                      <span className="text-white font-medium">Completed</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">#PT-8829</td>
                  <td className="px-6 py-4 whitespace-nowrap">Appointment Set</td>
                  <td className="px-6 py-4 whitespace-nowrap">03:10</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-900/20 text-emerald-400">Positive</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-primary hover:text-emerald-400 font-medium">Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}