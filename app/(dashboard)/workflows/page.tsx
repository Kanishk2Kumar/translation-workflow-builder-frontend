"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import {
  createWorkflow,
  getAgents,
  getWorkflows,
  deleteWorkflow,
} from "@/app/actions/workflow";

type WorkflowCard = {
  id: string;
  title: string;
  description: string;
  status: string;
  lastUpdated: string;
  icon: string;
  iconColor: string;
  iconBg: string;
};

type WorkflowRecord = {
  id: string;
  name: string;
  description: string | null;
  updated_at: string;
};

function generateWorkflowAuthToken() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = new Uint8Array(30);
  crypto.getRandomValues(bytes);

  const tokenBody = Array.from(bytes, (byte) => chars[byte % chars.length]).join("");
  return `tl-${tokenBody}`;
}

export default function Workflows() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [agents, setAgents] = useState<{ id: string; name: string }[]>([]);
  const [agentSelection, setAgentSelection] = useState("new");
  const [agentAuthType, setAgentAuthType] = useState("none");
  const [workflowAuthType, setWorkflowAuthType] = useState("none");
  const [workflowAuthToken, setWorkflowAuthToken] = useState("");
  const [copiedWorkflowToken, setCopiedWorkflowToken] = useState(false);
  const [workflows, setWorkflows] = useState<WorkflowCard[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      getAgents().then((data) => {
        setAgents(data);
        if (data.length > 0) setAgentSelection(data[0].id);
      });
    }
  }, [isModalOpen]);

  function handleWorkflowAuthTypeChange(value: string) {
    setWorkflowAuthType(value);

    if (value === "api_key") {
      setWorkflowAuthToken((currentToken) => currentToken || generateWorkflowAuthToken());
      return;
    }

    setWorkflowAuthToken("");
    setCopiedWorkflowToken(false);
  }

  function handleGenerateWorkflowToken() {
    setWorkflowAuthToken(generateWorkflowAuthToken());
    setCopiedWorkflowToken(false);
  }

  async function handleCopyWorkflowToken() {
    if (!workflowAuthToken) return;

    try {
      await navigator.clipboard.writeText(workflowAuthToken);
      setCopiedWorkflowToken(true);
      window.setTimeout(() => setCopiedWorkflowToken(false), 2000);
    } catch {
      setError("Failed to copy workflow auth token.");
    }
  }

  // Wrapper for the server action to handle loading & errors
  async function handleCreate(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await createWorkflow(formData);

    // If redirect happens, the code below won't execute.
    // If it reaches here, an error occurred.
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }
  async function handleDelete(id: string) {
    const res = await deleteWorkflow(id);

    if (res?.error) {
      alert(res.error);
      return;
    }

    setWorkflows((prev) => prev.filter((w) => w.id !== id));
  }
  useEffect(() => {
    getWorkflows().then((data) => {
      if (!data) return;

      const formatted = data.map((w: WorkflowRecord) => ({
        id: w.id,
        title: w.name,
        description: w.description || "No description provided.",
        status: "Draft", // you don’t have status column yet
        lastUpdated: new Date(w.updated_at).toLocaleString(),
        icon: "account_tree",
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-900/30",
      }));

      setWorkflows(formatted);
    });
  }, []);

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-dark relative">
      {/* --- CREATE WORKFLOW MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111813] border border-border-dark rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border-dark flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                Create New Workflow
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>

            <form
              action={handleCreate}
              className="p-6 space-y-5 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {error && (
                <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-lg">
                  {error}
                </div>
              )}

              {/* --- WORKFLOW DETAILS --- */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-wider border-b border-border-dark pb-2">
                  1. Workflow Details
                </h4>

                <div className="space-y-2">
                  <label
                    htmlFor="workflowName"
                    className="text-sm font-semibold text-slate-300"
                  >
                    Workflow Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="workflowName"
                    name="workflowName"
                    type="text"
                    required
                    placeholder="e.g., Post-Discharge Follow-up"
                    className="w-full bg-surface-dark border border-border-dark rounded-lg p-3 text-sm text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="workflowDescription"
                    className="text-sm font-semibold text-slate-300"
                  >
                    Workflow Description
                  </label>
                  <textarea
                    id="workflowDescription"
                    name="workflowDescription"
                    rows={2}
                    placeholder="Briefly describe what this workflow does..."
                    className="w-full bg-surface-dark border border-border-dark rounded-lg p-3 text-sm text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="workflowAuthType"
                    className="text-sm font-semibold text-slate-300"
                  >
                    Workflow Auth Type
                  </label>
                  <select
                    id="workflowAuthType"
                    name="workflowAuthType"
                    value={workflowAuthType}
                    onChange={(e) => handleWorkflowAuthTypeChange(e.target.value)}
                    className="w-full bg-surface-dark border border-border-dark rounded-lg p-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="none">None</option>
                    <option value="api_key">API Key</option>
                  </select>
                </div>

                {workflowAuthType === "api_key" && (
                  <div className="rounded-xl border border-amber-500/20 bg-[#162e1e]/40 p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                    <input
                      type="hidden"
                      name="workflowAuthToken"
                      value={workflowAuthToken}
                      readOnly
                    />
                    <div className="space-y-2">
                      <label
                        htmlFor="workflowAuthTokenDisplay"
                        className="text-xs font-semibold text-slate-400"
                      >
                        Auth Token
                      </label>
                      <input
                        id="workflowAuthTokenDisplay"
                        type="text"
                        value={workflowAuthToken}
                        readOnly
                        className="w-full bg-[#111813] border border-border-dark rounded-md p-2.5 text-sm text-gray-300 outline-none font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleGenerateWorkflowToken}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-bold text-[#111813] transition-colors hover:bg-[#0e9f6e]"
                      >
                        <span className="material-symbols-outlined text-[16px]">autorenew</span>
                        Generate
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyWorkflowToken}
                        disabled={!workflowAuthToken}
                        className="inline-flex items-center gap-2 rounded-md border border-border-dark bg-[#111813] px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-[#1b241e] disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedWorkflowToken ? "check" : "content_copy"}
                        </span>
                        {copiedWorkflowToken ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Example: `tl-9f3aKx7LpQ2vR8mN1bZ4cD6eH0yTgW`
                    </p>
                  </div>
                )}
              </div>

              {/* --- AGENT DETAILS --- */}
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-wider border-b border-border-dark pb-2">
                  2. Assign Voice Agent
                </h4>

                <div className="space-y-2">
                  <label
                    htmlFor="agentSelection"
                    className="text-sm font-semibold text-slate-300"
                  >
                    Select Agent <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="agentSelection"
                    name="agentSelection"
                    value={agentSelection}
                    onChange={(e) => setAgentSelection(e.target.value)}
                    className="w-full bg-surface-dark border border-border-dark rounded-lg p-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
                  >
                    {agents.length > 0 && (
                      <optgroup label="Your Existing Agents">
                        {agents.map((agent) => (
                          <option key={agent.id} value={agent.id}>
                            {agent.name}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    <optgroup label="Create New">
                      <option value="new">+ Create a New Agent</option>
                    </optgroup>
                  </select>
                </div>

                {/* SHOW THESE FIELDS ONLY IF CREATING A NEW AGENT */}
                {agentSelection === "new" && (
                  <div className="p-4 bg-[#162e1e]/40 border border-primary/20 rounded-xl space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="agentName"
                        className="text-xs font-semibold text-slate-400"
                      >
                        Agent Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="agentName"
                        name="agentName"
                        type="text"
                        required={agentSelection === "new"}
                        placeholder="e.g., Triage Bot Alpha"
                        className="w-full bg-[#111813] border border-border-dark rounded-md p-2.5 text-sm text-gray-500 outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="agentDescription"
                        className="text-xs font-semibold text-slate-400"
                      >
                        Agent Description
                      </label>
                      <input
                        id="agentDescription"
                        name="agentDescription"
                        type="text"
                        placeholder="Internal notes about this agent..."
                        className="w-full bg-[#111813] border border-border-dark rounded-md p-2.5 text-sm text-gray-500 outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="authType"
                          className="text-xs font-semibold text-slate-400"
                        >
                          API Auth Type
                        </label>
                        <select
                          id="authType"
                          name="authType"
                          value={agentAuthType}
                          onChange={(e) => setAgentAuthType(e.target.value)}
                          className="w-full bg-[#111813] border border-border-dark rounded-md p-2.5 text-sm text-gray-500 outline-none focus:border-primary appearance-none cursor-pointer"
                        >
                          <option value="none">None (Public)</option>
                          <option value="bearer">Bearer Token</option>
                        </select>
                      </div>

                      {agentAuthType === "bearer" && (
                        <div className="space-y-2 animate-in fade-in zoom-in-95">
                          <label
                            htmlFor="authToken"
                            className="text-xs font-semibold text-slate-400"
                          >
                            Bearer Token <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="authToken"
                            name="authToken"
                            type="password"
                            required={agentAuthType === "bearer"}
                            placeholder="sk-..."
                            className="w-full bg-[#111813] border border-border-dark rounded-md p-2.5 text-sm text-gray-500 outline-none focus:border-primary transition-all"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border-dark">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-[#111813] bg-primary rounded-lg hover:bg-[#0e9f6e] transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Create Workflow"}
                  {!isLoading && (
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border-dark bg-[#111813]">
        {/* Left: Title */}
        <div className="flex items-center gap-4 w-1/4">
          <button className="md:hidden p-2 text-white rounded-lg hover:bg-surface-dark">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Workflows
          </h2>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 flex justify-center w-2/4">
          <div className="relative group w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400">
                search
              </span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-border-dark rounded-lg leading-5 bg-surface-dark text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
              placeholder="Search workflows by name or ID..."
              type="text"
            />
          </div>
        </div>

        {/* Right: Create Button */}
        <div className="flex items-center justify-end gap-4 w-1/4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#111813] bg-primary rounded-lg hover:bg-[#0e9f6e] transition-colors shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Create Workflow
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {/* Page Header Info */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white">Your Workflows</h3>
          <p className="text-sm text-slate-400 mt-1">
            Manage, edit, and monitor your conversational AI routes.
          </p>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="bg-surface-dark rounded-xl border border-border-dark shadow-sm p-6 flex flex-col hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group"
            >
              {/* Card Header (Icon + Badge) */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${workflow.iconBg} ${workflow.iconColor}`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {workflow.icon}
                  </span>
                </div>

                {/* Status Badge */}
                {workflow.status === "Running" && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                    Running
                  </span>
                )}
                {workflow.status === "Draft" && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600">
                    Draft
                  </span>
                )}
                {workflow.status === "Error" && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400 border border-red-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5"></span>
                    Error
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="mb-6 flex-1">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {workflow.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                  {workflow.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border-dark">
                <span className="text-xs text-slate-500">
                  Updated {workflow.lastUpdated}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      (window.location.href = `/create?id=${workflow.id}`)
                    }
                    className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-[#28392e] transition-colors"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === workflow.id ? null : workflow.id,
                        )
                      }
                      className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-[#28392e] transition-colors"
                      title="Options"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        more_horiz
                      </span>
                    </button>

                    {openMenuId === workflow.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-[#111813] border border-border-dark rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => handleDelete(workflow.id)}
                          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#1f2a22]"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            alert("Share coming soon");
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-[#1f2a22]"
                        >
                          Share
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
