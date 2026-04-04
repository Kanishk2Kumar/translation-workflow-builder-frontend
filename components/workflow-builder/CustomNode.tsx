"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";

type HandleConfig = {
  hasTarget: boolean;
  hasSource: boolean;
  topTarget?: boolean;
  subHandles?: { id: string; label: string }[];
  sourcePorts?: { id: string; label: string }[];
};

const HANDLE_CONFIG: Record<string, HandleConfig> = {
  // Input nodes — no incoming connection
  document_upload: { hasTarget: false, hasSource: true },
  text_input:      { hasTarget: false, hasSource: true },

  // Output nodes — no outgoing connection
  output:          { hasTarget: true, hasSource: false },
  document_output: { hasTarget: true, hasSource: false },

  // IF / else — two named output ports
  if_else: {
    hasTarget: true,
    hasSource: false,
    sourcePorts: [
      { id: "true",  label: "true" },
      { id: "false", label: "false" },
    ],
  },

  // AI Agent — main flow handles + sub-handles for model/memory/tools
  llm_agent: {
    hasTarget: true,
    hasSource: true,
    subHandles: [
      { id: "chat_model", label: "Chat Model" },
      { id: "memory",     label: "Memory" },
      { id: "tool",       label: "Tool" },
    ],
  },

  // Support nodes — single top TARGET handle only
  // LLM Agent's bottom sub-handle (source) connects INTO this (target)
  rag_tm:    { hasTarget: false, hasSource: false, topTarget: true },
  vector_db: { hasTarget: false, hasSource: false, topTarget: true },

  // Standard pipeline nodes
  phi_detector:     { hasTarget: true, hasSource: true },
  source_validator: { hasTarget: true, hasSource: true },
  translation:      { hasTarget: true, hasSource: true },
  compliance:       { hasTarget: true, hasSource: true },
  comet_qe:         { hasTarget: true, hasSource: true },
  learning:         { hasTarget: true, hasSource: true },
};

const DEFAULT_CONFIG: HandleConfig = { hasTarget: true, hasSource: true };

// ─── Sub-handle row (AI Agent bottom diamonds) ────────────────────────────────

function SubHandles({ handles }: { handles: { id: string; label: string }[] }) {
  return (
    <div className="relative flex justify-around px-3 pb-3 pt-1">
      {handles.map((h) => (
        <div key={h.id} className="flex flex-col items-center gap-1">
          <div className="w-px h-4 border-l border-dashed border-slate-500" />
          <Handle
            type="source"
            position={Position.Bottom}
            id={h.id}
            style={{
              position: "relative",
              transform: "rotate(45deg)",
              width: 10,
              height: 10,
              background: "#534AB7",
              border: "2px solid #111813",
              borderRadius: 2,
              top: "auto",
              left: "auto",
            }}
          />
          <span className="text-[9px] text-purple-300 font-medium mt-0.5 whitespace-nowrap">
            {h.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Named source ports (IF node true / false) ────────────────────────────────

function SourcePorts({ ports }: { ports: { id: string; label: string }[] }) {
  const total = ports.length;
  return (
    <>
      {ports.map((port, i) => {
        const topPct = total === 1 ? 50 : 30 + i * 40;
        return (
          <div
            key={port.id}
            style={{
              position: "absolute",
              right: -42,
              top: `${topPct}%`,
              transform: "translateY(-50%)",
            }}
            className="flex items-center gap-1"
          >
            <span className="text-[9px] text-slate-400">{port.label}</span>
            <Handle
              type="source"
              position={Position.Right}
              id={port.id}
              style={{
                position: "relative",
                width: 10,
                height: 10,
                background: "#1D9E75",
                border: "2px solid #111813",
                borderRadius: "50%",
                top: "auto",
                right: "auto",
              }}
            />
          </div>
        );
      })}
    </>
  );
}

// ─── Main CustomNode ──────────────────────────────────────────────────────────

export const CustomNode = ({ data, selected }: { data: any; selected: boolean }) => {
  const config = HANDLE_CONFIG[data.nodeType] ?? DEFAULT_CONFIG;

  return (
    <div
      className={`w-64 rounded-xl border bg-[#162e1e]/90 backdrop-blur-md shadow-2xl transition-all relative ${
        selected ? "border-primary ring-1 ring-primary/50" : "border-border-dark"
      }`}
    >
      {/* Top TARGET handle — RAG / VectorDB connect up into LLM Agent sub-handles */}
      {config.topTarget && (
        <Handle
          type="target"
          position={Position.Top}
          id="top_in"
          style={{
            width: 10,
            height: 10,
            background: "#534AB7",
            border: "2px solid #111813",
            borderRadius: "50%",
            top: -5,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      )}

      {/* Left input handle */}
      {config.hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3! h-3! bg-slate-500! border-2! border-[#111813]!"
        />
      )}

      {/* Node body */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${data.iconBg} ${data.iconColor}`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {data.icon}
              </span>
            </div>
            <div>
              <div className="font-bold text-white text-sm leading-tight">
                {data.label}
              </div>
              {data.nodeType && (
                <div className="text-[9px] text-slate-500 font-mono">
                  {data.nodeType}
                </div>
              )}
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-500 text-[18px]">
            more_horiz
          </span>
        </div>

        <div className="text-xs text-slate-400 font-mono bg-black/20 p-2 rounded border border-border-dark whitespace-pre-wrap">
          {data.sublabel}
        </div>

        {data.badge && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
              {data.badge}
            </span>
          </div>
        )}
      </div>

      {/* Sub-handles row (AI Agent style) */}
      {config.subHandles && <SubHandles handles={config.subHandles} />}

      {/* Standard right output handle */}
      {config.hasSource && !config.sourcePorts && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3! h-3! bg-primary! border-2! border-[#111813]!"
        />
      )}

      {/* Named output ports (IF node) */}
      {config.sourcePorts && (
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 0 }}>
          <SourcePorts ports={config.sourcePorts} />
        </div>
      )}
    </div>
  );
};

export const nodeTypes = {
  customNode: CustomNode,
};