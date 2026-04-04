"use client";

import React, { useState } from "react";

// ─── Node definitions ────────────────────────────────────────────────────────

const NODE_CATEGORIES = [
  {
    category: "Input & Output",
    nodes: [
      {
        label: "Document Upload",
        sublabel: "Accepts: PDF, DOCX",
        icon: "upload_file",
        iconBg: "bg-blue-900/30",
        iconColor: "text-blue-400",
        nodeType: "document_upload",
      },
      {
        label: "Text Input",
        sublabel: "Plain text source",
        icon: "text_fields",
        iconBg: "bg-blue-900/30",
        iconColor: "text-sky-400",
        nodeType: "text_input",
      },
      {
        label: "Output",
        sublabel: "Format: JSON / text",
        icon: "output",
        iconBg: "bg-slate-800",
        iconColor: "text-slate-300",
        nodeType: "output",
      },
      {
        label: "Document Output",
        sublabel: "Format: PDF / DOCX",
        icon: "picture_as_pdf",
        iconBg: "bg-slate-800",
        iconColor: "text-orange-300",
        nodeType: "document_output",
      },
      {
        label: "IF / Else",
        sublabel: "Condition: undefined",
        icon: "call_split",
        iconBg: "bg-violet-900/30",
        iconColor: "text-violet-400",
        nodeType: "if_else",
      },
    ],
  },
  {
    category: "Translation Core",
    nodes: [
      {
        label: "PHI Detector",
        sublabel: "Masks: names, DOB, MRN",
        icon: "health_and_safety",
        iconBg: "bg-red-900/30",
        iconColor: "text-red-400",
        nodeType: "phi_detector",
      },
      {
        label: "Source Validator",
        sublabel: "Spell / grammar / flags",
        icon: "spellcheck",
        iconBg: "bg-amber-900/30",
        iconColor: "text-amber-400",
        nodeType: "source_validator",
      },
      {
        label: "RAG / TM",
        sublabel: "pgvector similarity search",
        icon: "manage_search",
        iconBg: "bg-purple-900/30",
        iconColor: "text-purple-400",
        nodeType: "rag_tm",
      },
      {
        label: "Translation",
        sublabel: "Claude · IndicTrans2 · DeepL",
        icon: "translate",
        iconBg: "bg-emerald-900/30",
        iconColor: "text-emerald-400",
        nodeType: "translation",
      },
      {
        label: "Compliance Checker",
        sublabel: "FDA · CMS · jurisdiction",
        icon: "verified_user",
        iconBg: "bg-red-900/30",
        iconColor: "text-red-400",
        nodeType: "compliance",
      },
    ],
  },
  {
    category: "AI & Models",
    nodes: [
      {
        label: "LLM Agent",
        sublabel: "Model: Claude Sonnet",
        icon: "smart_toy",
        iconBg: "bg-emerald-900/30",
        iconColor: "text-emerald-400",
        nodeType: "llm_agent",
      },
      {
        label: "Vector DB",
        sublabel: "Store: pgvector",
        icon: "database",
        iconBg: "bg-purple-900/30",
        iconColor: "text-purple-400",
        nodeType: "vector_db",
      },
    ],
  },
  {
    category: "Quality & Learning",
    nodes: [
      {
        label: "COMETKiwi QE",
        sublabel: "Quality score · ~50ms",
        icon: "analytics",
        iconBg: "bg-teal-900/30",
        iconColor: "text-teal-400",
        nodeType: "comet_qe",
      },
      {
        label: "Learning & Feedback",
        sublabel: "TM update · fine-tune batch",
        icon: "model_training",
        iconBg: "bg-green-900/30",
        iconColor: "text-green-400",
        nodeType: "learning",
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function NodeLibrarySidebar({ isOpen }: { isOpen: boolean }) {
  const [search, setSearch] = useState("");

  const onDragStart = (event: React.DragEvent, nodeData: object) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const filtered = NODE_CATEGORIES.map((cat) => ({
    ...cat,
    nodes: cat.nodes.filter(
      (n) =>
        search === "" ||
        n.label.toLowerCase().includes(search.toLowerCase()) ||
        n.sublabel.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter((cat) => cat.nodes.length > 0);

  return (
    <aside
      className={`bg-[#111813] border-r border-border-dark flex flex-col z-10 shadow-xl transition-all duration-300 ease-in-out ${
        isOpen
          ? "w-72 translate-x-0"
          : "w-0 -translate-x-full overflow-hidden border-none"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border-dark min-w-[18rem]">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Node Library
        </h3>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c2e24] border border-border-dark rounded p-2 pl-9 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Node list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 min-w-[18rem] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filtered.map((cat) => (
          <div key={cat.category}>
            <h4 className="text-xs font-semibold text-slate-500 mb-3">
              {cat.category}
            </h4>
            <div className="space-y-2">
              {cat.nodes.map((node) => (
                <div
                  key={node.nodeType}
                  draggable
                  onDragStart={(e) => onDragStart(e, node)}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-border-dark bg-[#1c2e24] hover:border-primary/50 cursor-grab active:cursor-grabbing transition-colors"
                >
                  <div
                    className={`p-1.5 rounded ${node.iconBg} ${node.iconColor} shrink-0`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {node.icon}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-bold text-white truncate">
                      {node.label}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {node.sublabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-xs text-slate-500 text-center mt-8">
            No nodes match &ldquo;{search}&rdquo;
          </p>
        )}
      </div>
    </aside>
  );
}
