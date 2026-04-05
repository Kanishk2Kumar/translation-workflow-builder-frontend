"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentWorkflowUserId, getWorkflow } from "@/app/actions/workflow";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

type WorkflowRunResponse = {
  execution_id: string;
  status: string;
  output: Record<string, unknown>;
  logs: Array<{
    node_id: string;
    node_type: string;
    status: string;
    ms: number;
    error?: string;
  }>;
  cache_hit?: boolean;
};

type WorkflowMeta = {
  auth_type?: string | null;
  auth_token?: string | null;
};

type ApiLinkItem = {
  method: "GET" | "POST" | "DELETE";
  path: string;
  label: string;
  group: "workflow" | "glossary";
};

const methodClassNames: Record<ApiLinkItem["method"], string> = {
  GET: "border-sky-500/40 bg-sky-500/10 text-sky-200",
  POST: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  DELETE: "border-red-500/40 bg-red-500/10 text-red-200",
};

function getDownloadFileName(contentDisposition: string | null, fallback: string) {
  if (!contentDisposition) return fallback;
  const utf8 = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8?.[1]) return decodeURIComponent(utf8[1]);
  const ascii = contentDisposition.match(/filename="?([^"]+)"?/i);
  if (ascii?.[1]) return ascii[1];
  return fallback;
}

function getOutputValue(output: Record<string, unknown>, key: string) {
  return output[key];
}

function getNestedOutputValue(output: Record<string, unknown>, key: string, nestedKey: string) {
  const value = output[key];
  if (!value || typeof value !== "object") return undefined;
  return (value as Record<string, unknown>)[nestedKey];
}

function formatOutputValue(value: unknown) {
  if (typeof value === "string" || typeof value === "number") return value;
  return "-";
}

function SimulatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const workflowId = searchParams.get("workflow_id");

  // Form state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState("hi");
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoadingUserId, setIsLoadingUserId] = useState(true);

  // Run state
  const [isRunning, setIsRunning] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const [runResult, setRunResult] = useState<WorkflowRunResponse | null>(null);

  // Download state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [workflowMeta, setWorkflowMeta] = useState<WorkflowMeta | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  // Redirect if no workflow_id
  useEffect(() => {
    if (!workflowId) router.replace("/workflows");
  }, [workflowId, router]);

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentUserId() {
      const result = await getCurrentWorkflowUserId();

      if (!isMounted) return;

      if (result.userId) {
        setUserId(result.userId);
        setRunError(null);
      } else {
        setUserId(null);
        setRunError(result.error ?? "Could not load your user session.");
      }

      setIsLoadingUserId(false);
    }

    loadCurrentUserId();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!workflowId) return;
    const currentWorkflowId = workflowId;

    let isMounted = true;

    async function loadWorkflowMeta() {
      const workflow = await getWorkflow(currentWorkflowId);
      if (!isMounted || !workflow) return;

      setWorkflowMeta({
        auth_type: typeof workflow.auth_type === "string" ? workflow.auth_type : null,
        auth_token: typeof workflow.auth_token === "string" ? workflow.auth_token : null,
      });
    }

    loadWorkflowMeta();

    return () => {
      isMounted = false;
    };
  }, [workflowId]);

  const canSubmit =
    Boolean(workflowId) &&
    API_BASE_URL.length > 0 &&
    selectedFile !== null &&
    Boolean(userId) &&
    !isLoadingUserId;

  const handleRun = async () => {
    if (!workflowId) return;
    if (!selectedFile) return setRunError("Please upload a document first.");
    if (!API_BASE_URL) return setRunError("NEXT_PUBLIC_API_URL is not configured.");
    if (!userId) return setRunError("Could not load your user session.");

    setIsRunning(true);
    setRunError(null);
    setRunResult(null);
    setDownloadError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("target_language", targetLanguage.trim() || "hi");
      formData.append("user_id", userId);

      const res = await fetch(
        `${API_BASE_URL}/workflow/${encodeURIComponent(workflowId)}/run`,
        { method: "POST", body: formData },
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server returned ${res.status}`);
      }

      setRunResult((await res.json()) as WorkflowRunResponse);
    } catch (err) {
      setRunError(err instanceof Error ? err.message : "Failed to run workflow.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleDownload = async () => {
    if (!workflowId || !runResult?.execution_id) return;

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/workflow/${encodeURIComponent(workflowId)}/execution/${encodeURIComponent(runResult.execution_id)}/download`,
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server returned ${res.status}`);
      }

      const blob = await res.blob();
      const fileName = getDownloadFileName(
        res.headers.get("content-disposition"),
        `translated-${runResult.execution_id}.docx`,
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : "Failed to download.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyAuthToken = async () => {
    if (!workflowMeta?.auth_token) return;

    try {
      await navigator.clipboard.writeText(workflowMeta.auth_token);
      setCopiedToken(true);
      window.setTimeout(() => setCopiedToken(false), 2000);
    } catch {
      setRunError("Failed to copy auth token.");
    }
  };

  if (!workflowId) return null;

  const backendDocsUrl = API_BASE_URL ? `${API_BASE_URL}/backend_urls` : "";
  const workflowPathId = workflowId || "{workflow_id}";
  const executionPathId = runResult?.execution_id || "{execution_id}";
  const glossaryUserId = userId || "{user_id}";
  const apiLinks: ApiLinkItem[] = [
    {
      method: "GET",
      path: `/workflow/user/${glossaryUserId}`,
      label: "List User Workflows",
      group: "workflow",
    },
    {
      method: "POST",
      path: `/workflow/${workflowPathId}/run`,
      label: "Run Workflow",
      group: "workflow",
    },
    {
      method: "GET",
      path: `/workflow/${workflowPathId}/execution/${executionPathId}/segments`,
      label: "Get Execution Segments",
      group: "workflow",
    },
    {
      method: "POST",
      path: `/workflow/${workflowPathId}/execution/${executionPathId}/retranslate`,
      label: "Retranslate Workflow",
      group: "workflow",
    },
    {
      method: "GET",
      path: `/workflow/${workflowPathId}/execution/${executionPathId}/download`,
      label: "Download Translated Document",
      group: "workflow",
    },
    {
      method: "POST",
      path: `/glossary/${glossaryUserId}/terms`,
      label: "Add Term",
      group: "glossary",
    },
    {
      method: "GET",
      path: `/glossary/${glossaryUserId}/terms`,
      label: "List Terms",
      group: "glossary",
    },
    {
      method: "DELETE",
      path: `/glossary/${glossaryUserId}/terms/{term_id}`,
      label: "Delete Term",
      group: "glossary",
    },
  ];

  const successLogs = runResult?.logs.filter((l) => l.status === "success") ?? [];
  const errorLogs = runResult?.logs.filter((l) => l.status === "error") ?? [];
  const skippedLogs = runResult?.logs.filter((l) => l.status === "skipped") ?? [];

  return (
    <div className="min-h-screen bg-[#0A0F0C] text-white">

      {/* Top nav */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border-dark bg-[#111813] px-6 py-3">
        <div className="flex items-center gap-4">
          <Link
            href={`/create?id=${workflowId}`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white bg-[#1c2e24] hover:bg-[#28392e] border border-border-dark rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to editor
          </Link>
          <div className="w-px h-5 bg-border-dark" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-500/70">
              Simulation
            </p>
            <p className="text-sm font-semibold text-white leading-tight">
              {workflowId}
            </p>
          </div>
        </div>

        <code className="hidden sm:block rounded-lg bg-black/30 border border-border-dark px-3 py-1.5 text-xs text-emerald-300">
          POST /workflow/{workflowId}/run
        </code>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">

        {/* ── LEFT: Configuration ── */}
        <div className="space-y-5">
          <div>
            <h1 className="text-xl font-bold text-white">Configure run</h1>
            <p className="mt-1 text-sm text-slate-400">
              Set inputs and parameters, then hit Run.
            </p>
          </div>

          {/* Document upload */}
          <div className="rounded-2xl border border-border-dark bg-[#111813] p-5">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
              Document
            </label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border-dark bg-[#0A0F0C] px-6 py-10 text-center transition-all hover:border-primary/50 hover:bg-[#0d140f]">
              <span className="material-symbols-outlined text-4xl text-slate-600">upload_file</span>
              <span className="mt-3 text-sm font-semibold text-white">
                {selectedFile ? selectedFile.name : "Click to choose a file"}
              </span>
              <span className="mt-1 text-xs text-slate-500">
                {selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(1)} KB — ${selectedFile.type || "unknown type"}`
                  : "PDF or DOCX"}
              </span>
              <input
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={(e) => {
                  setSelectedFile(e.target.files?.[0] ?? null);
                  setRunResult(null);
                  setRunError(null);
                }}
              />
            </label>
            {selectedFile && (
              <button
                type="button"
                onClick={() => { setSelectedFile(null); setRunResult(null); }}
                className="mt-2 text-xs text-slate-500 hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Language */}
          <div className="rounded-2xl border border-border-dark bg-[#111813] p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                Target language
              </label>
              <input
                type="text"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                placeholder="hi"
                className="w-full rounded-xl border border-border-dark bg-[#0A0F0C] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-primary"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                ISO code — hi, es, fr, de, ja, mr …
              </p>
            </div>

            <div className="h-px bg-border-dark" />

            <div>
              <label className="hidden">
                Session user
              </label>
              <input
                type="hidden"
                value={userId ?? ""}
                readOnly
                className="hidden"
              />
              <p className="text-xs text-slate-500">
                {isLoadingUserId
                  ? "Capturing your signed-in user session for glossary lookup..."
                  : "Your signed-in user session will be used automatically for glossary lookup."}
              </p>
            </div>
          </div>

          {/* Run button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleRun}
              disabled={!canSubmit || isRunning}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-[#111813] transition-colors hover:bg-[#0e9f6e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isRunning ? "hourglass_top" : "play_arrow"}
              </span>
              {isRunning ? "Running workflow…" : "Run workflow"}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={!runResult?.execution_id || isDownloading}
              className="inline-flex items-center gap-2 rounded-xl border border-border-dark bg-[#111813] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-primary/40 hover:bg-[#162019] disabled:cursor-not-allowed disabled:opacity-40"
              title="Download translated document"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
              {isDownloading ? "…" : "Download"}
            </button>
          </div>

          {runError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              <span className="font-semibold">Run failed — </span>{runError}
            </div>
          )}

          {downloadError && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              <span className="font-semibold">Download failed — </span>{downloadError}
            </div>
          )}
        </div>

        {/* ── RIGHT: Results ── */}
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-white">Results</h2>
            <p className="mt-1 text-sm text-slate-400">
              Execution output and per-node logs appear here after a run.
            </p>
          </div>

          <div className="rounded-2xl border border-border-dark bg-[#111813] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  API Links
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Backend routes generated from `NEXT_PUBLIC_API_URL/backend_urls`.
                </p>
              </div>
              {backendDocsUrl && (
                <a
                  href={backendDocsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border-dark bg-[#0A0F0C] px-3 py-2 text-xs font-semibold text-white transition-colors hover:border-primary/40 hover:bg-[#162019]"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  Open Backend URLs
                </a>
              )}
            </div>

            {workflowMeta?.auth_type === "api_key" && workflowMeta.auth_token && (
              <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
                      Auth Token
                    </p>
                    <p className="mt-2 break-all font-mono text-xs text-amber-50">
                      {workflowMeta.auth_token}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAuthToken}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-400/20 bg-black/20 px-3 py-1.5 text-xs font-semibold text-amber-100 transition-colors hover:bg-black/30"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {copiedToken ? "check" : "content_copy"}
                    </span>
                    {copiedToken ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 space-y-4">
              {(["workflow", "glossary"] as const).map((group) => (
                <div key={group}>
                  <h3 className="text-lg font-semibold capitalize text-white">{group}</h3>
                  <div className="mt-3 space-y-2">
                    {apiLinks
                      .filter((link) => link.group === group)
                      .map((link) => (
                        <a
                          key={`${group}-${link.method}-${link.path}`}
                          href={API_BASE_URL ? `${API_BASE_URL}${link.path}` : "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between gap-3 rounded-xl border border-border-dark bg-[#0A0F0C] px-4 py-3 transition-colors hover:border-primary/30 hover:bg-[#121a15]"
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${methodClassNames[link.method]}`}
                              >
                                {link.method}
                              </span>
                              <code className="break-all text-xs text-slate-200">
                                {link.path}
                              </code>
                            </div>
                            <p className="mt-1 text-sm text-slate-400">{link.label}</p>
                          </div>
                          <span className="material-symbols-outlined text-slate-500">
                            open_in_new
                          </span>
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!runResult ? (
            <div className="rounded-2xl border border-dashed border-border-dark bg-[#111813] flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-4xl text-slate-600">
                electric_bolt
              </span>
              <p className="mt-3 text-sm text-slate-500">
                No results yet — configure and run the workflow.
              </p>
            </div>
          ) : (
            <div className="space-y-4">


              <div className="rounded-2xl border border-border-dark bg-[#111813] p-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {runResult.status}
                    </span>
                    {typeof runResult.cache_hit === "boolean" && (
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${runResult.cache_hit ? "border-sky-500/30 bg-sky-500/10 text-sky-300" : "border-border-dark text-slate-500"}`}>
                        {runResult.cache_hit ? "cache hit" : "cache miss"}
                      </span>
                    )}
                  </div>
                  <code className="text-xs text-slate-500 font-mono break-all">
                    {runResult.execution_id}
                  </code>
                </div>

                {/* Quick stats */}
                {runResult.output && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      {
                        label: "Segments",
                        value: formatOutputValue(getOutputValue(runResult.output, "segment_count")),
                      },
                      {
                        label: "Input tokens",
                        value: formatOutputValue(
                          getNestedOutputValue(runResult.output, "token_usage", "input"),
                        ),
                      },
                      {
                        label: "Output tokens",
                        value: formatOutputValue(
                          getNestedOutputValue(runResult.output, "token_usage", "output"),
                        ),
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-xl bg-[#0A0F0C] border border-border-dark p-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
                        <p className="mt-1 text-lg font-bold text-white">{value ?? "—"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* {runResult.output?.translated_text && (
                <div className="rounded-2xl border border-border-dark bg-[#111813] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
                    Translated text
                  </p>
                  <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                    {runResult.output.translated_text as string}
                  </p>
                </div>
              )} */}

              <div className="rounded-2xl border border-border-dark bg-[#111813] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
                  Node execution timeline
                </p>
                <div className="space-y-2">
                  {runResult.logs.map((log, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 border text-xs ${
                        log.status === "success"
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : log.status === "error"
                          ? "border-red-500/30 bg-red-500/10"
                          : "border-border-dark bg-[#0A0F0C]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          log.status === "success" ? "bg-emerald-400" :
                          log.status === "error" ? "bg-red-400" : "bg-slate-600"
                        }`} />
                        <span className="font-mono text-slate-300 truncate">{log.node_type}</span>
                        {log.error && (
                          <span className="text-red-300 truncate">{log.error}</span>
                        )}
                      </div>
                      <span className={`flex-shrink-0 ml-3 font-mono tabular-nums ${
                        log.ms > 5000 ? "text-amber-400" : "text-slate-500"
                      }`}>
                        {log.ms}ms
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary counts */}
                <div className="mt-4 flex gap-4 text-xs text-slate-500">
                  <span className="text-emerald-400">{successLogs.length} succeeded</span>
                  {errorLogs.length > 0 && (
                    <span className="text-red-400">{errorLogs.length} failed</span>
                  )}
                  {skippedLogs.length > 0 && (
                    <span>{skippedLogs.length} skipped</span>
                  )}
                  <span className="ml-auto">
                    total {runResult.logs.reduce((acc, l) => acc + l.ms, 0)}ms
                  </span>
                </div>
              </div>

              {/* Full output JSON — collapsed by default */}
              <details className="rounded-2xl border border-border-dark bg-[#111813] overflow-hidden">
                <summary className="cursor-pointer px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors select-none">
                  Full output JSON
                </summary>
                <div className="border-t border-border-dark px-5 py-4">
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-slate-300 max-h-80">
                    {JSON.stringify(runResult.output, null, 2)}
                  </pre>
                </div>
              </details>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SimulatePageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full bg-[#0A0F0C] flex items-center justify-center text-emerald-500">
          Loading simulation…
        </div>
      }
    >
      <SimulatePage />
    </Suspense>
  );
}
