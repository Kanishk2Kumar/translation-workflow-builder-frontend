"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  leftOpen: boolean;
  setLeftOpen: (v: boolean) => void;
  rightOpen: boolean;
  setRightOpen: (v: boolean) => void;
  workflowName: string;
  workflowId: string | null;
}

export function WorkflowHeader({ 
  leftOpen, 
  setLeftOpen, 
  rightOpen, 
  setRightOpen, 
  workflowName,
  workflowId,
}: HeaderProps) {
  const router = useRouter();

  const handleSimulate = () => {
    if (!workflowId) return;
    router.push(`/simulate?workflow_id=${encodeURIComponent(workflowId)}`);
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border-dark bg-[#111813] z-20">
      
      <div className="flex items-center gap-3 w-1/3">
        <Link 
          href="/workflows" 
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white bg-[#1c2e24] hover:bg-[#28392e] border border-border-dark rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Save & Exit
        </Link>
        
        <div className="w-px h-6 bg-border-dark mx-2" />

        <button
          onClick={() => setLeftOpen(!leftOpen)}
          className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
            leftOpen ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white hover:bg-surface-dark"
          }`}
          title="Toggle Node Library"
        >
          <span className="material-symbols-outlined text-[20px]">
            {leftOpen ? "dock_to_left" : "menu"}
          </span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-1/3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-white tracking-tight">
            {workflowName || "Loading..."}
          </h2>
          <span className="text-[10px] font-bold text-slate-400 border border-border-dark px-1.5 py-0.5 rounded bg-surface-dark">
            v2.4
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 w-1/3">
        <button
          onClick={handleSimulate}
          disabled={!workflowId}
          className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-[#111813] bg-primary rounded-lg hover:bg-[#0e9f6e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          Simulate
        </button>

        <div className="w-px h-6 bg-border-dark mx-2" />

        <button
          onClick={() => setRightOpen(!rightOpen)}
          className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
            rightOpen ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white hover:bg-surface-dark"
          }`}
          title="Toggle Properties"
        >
          <span className="material-symbols-outlined text-[20px]">
            {rightOpen ? "dock_to_right" : "tune"}
          </span>
        </button>
      </div>
    </header>
  );
}