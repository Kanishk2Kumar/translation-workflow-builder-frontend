"use client";

import React, { useRef, useState } from "react";

interface PropertiesSidebarProps {
  isOpen: boolean;
  selectedNode: any;
  updateNodeData: (data: any) => void;
  deleteSelectedNode: () => void;
}

// ─── Reusable field components ────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#1c2e24] border border-border-dark rounded-md p-2.5 text-sm text-white outline-none focus:border-primary placeholder-slate-600"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#1c2e24] border border-border-dark rounded-md p-2.5 text-sm text-white outline-none focus:border-primary"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-300">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-10 h-5 rounded-full transition-colors relative ${
          value ? "bg-primary" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
            value ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

// ─── Per-node config panels ───────────────────────────────────────────────────

function DocumentUploadConfig({
  data,
  update,
}: {
  data: any;
  update: (d: any) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(
    data.uploadedFiles || []
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const names = Array.from(files).map((f) => f.name);
    const updated = [...uploadedFiles, ...names];
    setUploadedFiles(updated);
    update({ uploadedFiles: updated });
    // TODO: swap localStorage save for S3 upload when ready
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem(`doc_${file.name}`, reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (name: string) => {
    const updated = uploadedFiles.filter((f) => f !== name);
    setUploadedFiles(updated);
    update({ uploadedFiles: updated });
    localStorage.removeItem(`doc_${name}`);
  };

  return (
    <div className="space-y-4">
      <Field label="Accepted Formats">
        <Select
          value={data.acceptedFormats || "pdf,docx"}
          onChange={(v) => update({ acceptedFormats: v })}
          options={[
            { label: "PDF & DOCX", value: "pdf,docx" },
            { label: "PDF only", value: "pdf" },
            { label: "DOCX only", value: "docx" },
          ]}
        />
      </Field>

      <Field label="Upload Documents">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border-dark hover:border-primary/50"
          }`}
        >
          <span className="material-symbols-outlined text-2xl text-slate-500 block mb-1">
            cloud_upload
          </span>
          <p className="text-xs text-slate-400">
            Drop files here or <span className="text-primary">browse</span>
          </p>
          <p className="text-[10px] text-slate-600 mt-1">PDF, DOCX — max 20MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </Field>

      {uploadedFiles.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Uploaded
          </p>
          {uploadedFiles.map((name) => (
            <div
              key={name}
              className="flex items-center justify-between bg-[#1c2e24] border border-border-dark rounded-md px-3 py-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[14px] text-slate-400 shrink-0">
                  description
                </span>
                <span className="text-xs text-white truncate">{name}</span>
              </div>
              <button
                onClick={() => removeFile(name)}
                className="material-symbols-outlined text-[14px] text-slate-500 hover:text-red-400 shrink-0 ml-2"
              >
                close
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PHIDetectorConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Entities to mask">
        {[
          { key: "maskNames", label: "Patient names" },
          { key: "maskDob", label: "Date of birth" },
          { key: "maskMrn", label: "MRN / Patient ID" },
          { key: "maskAddress", label: "Address" },
          { key: "lockIcdCodes", label: "Lock ICD / CPT codes (never translate)" },
        ].map(({ key, label }) => (
          <Toggle
            key={key}
            label={label}
            value={data[key] !== false}
            onChange={(v) => update({ [key]: v })}
          />
        ))}
      </Field>
      <Field label="NER model">
        <Select
          value={data.nerModel || "spacy_en_core_web_trf"}
          onChange={(v) => update({ nerModel: v })}
          options={[
            { label: "spaCy en_core_web_trf (default)", value: "spacy_en_core_web_trf" },
            { label: "spaCy en_core_web_sm (fast)", value: "spacy_en_core_web_sm" },
          ]}
        />
      </Field>
    </div>
  );
}

function ValidatorConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Checks to run">
        {[
          { key: "spellCheck", label: "Spell check" },
          { key: "grammarCheck", label: "Grammar check" },
          { key: "consistencyCheck", label: "Terminology consistency" },
          { key: "punctuationCheck", label: "Punctuation / formatting" },
          { key: "abbreviationFlag", label: "Flag ambiguous abbreviations" },
        ].map(({ key, label }) => (
          <Toggle
            key={key}
            label={label}
            value={data[key] !== false}
            onChange={(v) => update({ [key]: v })}
          />
        ))}
      </Field>
      <Field label="Auto-fix severity">
        <Select
          value={data.autoFixSeverity || "low"}
          onChange={(v) => update({ autoFixSeverity: v })}
          options={[
            { label: "Fix low severity only", value: "low" },
            { label: "Fix low + medium", value: "medium" },
            { label: "Manual review all", value: "none" },
          ]}
        />
      </Field>
    </div>
  );
}

function RAGConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Exact match threshold">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={80}
            max={100}
            value={data.exactThreshold ?? 100}
            onChange={(e) => update({ exactThreshold: Number(e.target.value) })}
            className="flex-1 accent-primary"
          />
          <span className="text-sm text-white w-10 text-right">
            {data.exactThreshold ?? 100}%
          </span>
        </div>
      </Field>
      <Field label="Fuzzy match threshold">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={60}
            max={99}
            value={data.fuzzyThreshold ?? 75}
            onChange={(e) => update({ fuzzyThreshold: Number(e.target.value) })}
            className="flex-1 accent-primary"
          />
          <span className="text-sm text-white w-10 text-right">
            {data.fuzzyThreshold ?? 75}%
          </span>
        </div>
      </Field>
      <Field label="Embedding model">
        <Select
          value={data.embeddingModel || "multilingual-e5-large"}
          onChange={(v) => update({ embeddingModel: v })}
          options={[
            { label: "multilingual-e5-large (default)", value: "multilingual-e5-large" },
            { label: "text-embedding-3-small", value: "text-embedding-3-small" },
          ]}
        />
      </Field>
      <Field label="Top-K results">
        <TextInput
          value={String(data.topK ?? 5)}
          onChange={(v) => update({ topK: Number(v) })}
          placeholder="5"
        />
      </Field>
    </div>
  );
}

function TranslationConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Target language">
        <Select
          value={data.targetLanguage || "hi"}
          onChange={(v) => update({ targetLanguage: v })}
          options={[
            { label: "Hindi (hi)", value: "hi" },
            { label: "Spanish (es)", value: "es" },
            { label: "French (fr)", value: "fr" },
            { label: "German (de)", value: "de" },
            { label: "Japanese (ja)", value: "ja" },
            { label: "Marathi (mr)", value: "mr" },
            { label: "Tamil (ta)", value: "ta" },
            { label: "Telugu (te)", value: "te" },
          ]}
        />
      </Field>
      <Field label="Primary engine">
        <Select
          value={data.engine || "claude"}
          onChange={(v) => update({ engine: v })}
          options={[
            { label: "Claude Sonnet (default)", value: "claude" },
            { label: "IndicTrans2 (Indic languages)", value: "indictrans2" },
            { label: "DeepL (fallback)", value: "deepl" },
            { label: "Sarvam AI", value: "sarvam" },
          ]}
        />
      </Field>
      <Field label="Tone profile">
        <Select
          value={data.tone || "formal"}
          onChange={(v) => update({ tone: v })}
          options={[
            { label: "Formal", value: "formal" },
            { label: "Clinical", value: "clinical" },
            { label: "Patient-friendly", value: "patient_friendly" },
            { label: "Technical", value: "technical" },
          ]}
        />
      </Field>
      <Field label="Glossary ID (optional)">
        <TextInput
          value={data.glossaryId || ""}
          onChange={(v) => update({ glossaryId: v })}
          placeholder="e.g. gloss_cardiology_hi"
        />
      </Field>
      <Field label="Options">
        <Toggle
          label="Enforce glossary terms"
          value={data.enforceGlossary !== false}
          onChange={(v) => update({ enforceGlossary: v })}
        />
        <div className="mt-2">
          <Toggle
            label="Inject clinical context"
            value={data.injectContext !== false}
            onChange={(v) => update({ injectContext: v })}
          />
        </div>
      </Field>
    </div>
  );
}

function ComplianceConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Rule sets">
        {[
          { key: "checkCms", label: "CMS language access" },
          { key: "checkFda", label: "FDA label requirements" },
          { key: "checkHipaa", label: "HIPAA safe harbour" },
        ].map(({ key, label }) => (
          <Toggle
            key={key}
            label={label}
            value={data[key] !== false}
            onChange={(v) => update({ [key]: v })}
          />
        ))}
      </Field>
      <Field label="On violation">
        <Select
          value={data.onViolation || "flag"}
          onChange={(v) => update({ onViolation: v })}
          options={[
            { label: "Flag for review", value: "flag" },
            { label: "Block segment", value: "block" },
            { label: "Log only", value: "log" },
          ]}
        />
      </Field>
    </div>
  );
}

function LLMAgentConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Model">
        <Select
          value={data.model || "claude-sonnet-4-6"}
          onChange={(v) => update({ model: v })}
          options={[
            { label: "Claude Sonnet 4.6", value: "claude-sonnet-4-6" },
            { label: "Claude Opus 4.6", value: "claude-opus-4-6" },
            { label: "GPT-4o", value: "gpt-4o" },
          ]}
        />
      </Field>
      <Field label="System prompt">
        <textarea
          value={data.systemPrompt || ""}
          onChange={(e) => update({ systemPrompt: e.target.value })}
          rows={4}
          placeholder="You are a clinical translation assistant..."
          className="w-full bg-[#1c2e24] border border-border-dark rounded-md p-2.5 text-sm text-white outline-none focus:border-primary placeholder-slate-600 resize-none"
        />
      </Field>
      <Field label="Temperature">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={10}
            value={Math.round((data.temperature ?? 0.3) * 10)}
            onChange={(e) =>
              update({ temperature: Number(e.target.value) / 10 })
            }
            className="flex-1 accent-primary"
          />
          <span className="text-sm text-white w-8 text-right">
            {(data.temperature ?? 0.3).toFixed(1)}
          </span>
        </div>
      </Field>
      <Field label="Max tokens">
        <TextInput
          value={String(data.maxTokens ?? 1000)}
          onChange={(v) => update({ maxTokens: Number(v) })}
          placeholder="1000"
        />
      </Field>
    </div>
  );
}

function VectorDBConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Store type">
        <Select
          value={data.storeType || "pgvector"}
          onChange={(v) => update({ storeType: v })}
          options={[
            { label: "pgvector (default)", value: "pgvector" },
            { label: "Pinecone", value: "pinecone" },
          ]}
        />
      </Field>
      <Field label="Collection / index name">
        <TextInput
          value={data.collectionName || ""}
          onChange={(v) => update({ collectionName: v })}
          placeholder="e.g. translation_memory"
        />
      </Field>
      <Field label="Embedding model">
        <Select
          value={data.embeddingModel || "multilingual-e5-large"}
          onChange={(v) => update({ embeddingModel: v })}
          options={[
            { label: "multilingual-e5-large", value: "multilingual-e5-large" },
            { label: "text-embedding-3-small", value: "text-embedding-3-small" },
          ]}
        />
      </Field>
      <Field label="Operation">
        <Select
          value={data.operation || "upsert"}
          onChange={(v) => update({ operation: v })}
          options={[
            { label: "Upsert (store + update)", value: "upsert" },
            { label: "Query only", value: "query" },
            { label: "Delete", value: "delete" },
          ]}
        />
      </Field>
    </div>
  );
}

function COMETConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Model">
        <Select
          value={data.cometModel || "wmt22-cometkiwi-da"}
          onChange={(v) => update({ cometModel: v })}
          options={[
            { label: "wmt22-cometkiwi-da (fast)", value: "wmt22-cometkiwi-da" },
            { label: "wmt23-cometkiwi-da-xl (accurate)", value: "wmt23-cometkiwi-da-xl" },
          ]}
        />
      </Field>
      <Field label="Pass threshold">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={60}
            max={95}
            value={Math.round((data.passThreshold ?? 0.82) * 100)}
            onChange={(e) =>
              update({ passThreshold: Number(e.target.value) / 100 })
            }
            className="flex-1 accent-primary"
          />
          <span className="text-sm text-white w-12 text-right">
            {((data.passThreshold ?? 0.82) * 100).toFixed(0)}%
          </span>
        </div>
      </Field>
      <Field label="On fail">
        <Select
          value={data.onFail || "retry_llm"}
          onChange={(v) => update({ onFail: v })}
          options={[
            { label: "Retry with LLM", value: "retry_llm" },
            { label: "Flag for review", value: "flag" },
            { label: "Pass anyway", value: "pass" },
          ]}
        />
      </Field>
    </div>
  );
}

function LearningConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="On approval">
        {[
          { key: "updateTm", label: "Update translation memory" },
          { key: "enrichGlossary", label: "Suggest glossary enrichment" },
          { key: "batchFineTune", label: "Add to fine-tune batch" },
        ].map(({ key, label }) => (
          <Toggle
            key={key}
            label={label}
            value={data[key] !== false}
            onChange={(v) => update({ [key]: v })}
          />
        ))}
      </Field>
      <Field label="Min corrections before glossary update">
        <TextInput
          value={String(data.minCorrections ?? 3)}
          onChange={(v) => update({ minCorrections: Number(v) })}
          placeholder="3"
        />
      </Field>
    </div>
  );
}

function OutputConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Output format">
        <Select
          value={data.outputFormat || "docx"}
          onChange={(v) => update({ outputFormat: v })}
          options={[
            { label: "DOCX (preserve layout)", value: "docx" },
            { label: "PDF", value: "pdf" },
            { label: "JSON (segments)", value: "json" },
          ]}
        />
      </Field>
      <Field label="Include audit trail">
        <Toggle
          label="Attach full audit log"
          value={data.includeAudit !== false}
          onChange={(v) => update({ includeAudit: v })}
        />
      </Field>
      <Field label="Delivery">
        <Select
          value={data.delivery || "download"}
          onChange={(v) => update({ delivery: v })}
          options={[
            { label: "Download link", value: "download" },
            { label: "Webhook callback", value: "webhook" },
            { label: "API response body", value: "api" },
          ]}
        />
      </Field>
      {data.delivery === "webhook" && (
        <Field label="Webhook URL">
          <TextInput
            value={data.webhookUrl || ""}
            onChange={(v) => update({ webhookUrl: v })}
            placeholder="https://your-app.com/webhook"
          />
        </Field>
      )}
    </div>
  );
}
function TextInputConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Default text">
        <textarea
          value={data.defaultText || ""}
          onChange={(e) => update({ defaultText: e.target.value })}
          rows={4}
          placeholder="Enter source text..."
          className="w-full bg-[#1c2e24] border border-border-dark rounded-md p-2.5 text-sm text-white outline-none focus:border-primary placeholder-slate-600 resize-none"
        />
      </Field>
      <Field label="Variable name">
        <TextInput
          value={data.variableName || ""}
          onChange={(v) => update({ variableName: v })}
          placeholder="e.g. source_text"
        />
      </Field>
    </div>
  );
}
 
function IFElseConfig({ data, update }: { data: any; update: (d: any) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Condition field">
        <TextInput
          value={data.conditionField || ""}
          onChange={(v) => update({ conditionField: v })}
          placeholder="e.g. comet_score"
        />
      </Field>
      <Field label="Operator">
        <Select
          value={data.operator || "gte"}
          onChange={(v) => update({ operator: v })}
          options={[
            { label: "≥  (greater than or equal)", value: "gte" },
            { label: "≤  (less than or equal)",    value: "lte" },
            { label: ">  (greater than)",           value: "gt" },
            { label: "<  (less than)",              value: "lt" },
            { label: "== (equals)",                 value: "eq" },
            { label: "!= (not equals)",             value: "neq" },
          ]}
        />
      </Field>
      <Field label="Value">
        <TextInput
          value={data.conditionValue || ""}
          onChange={(v) => update({ conditionValue: v })}
          placeholder="e.g. 0.82"
        />
      </Field>
      <div className="bg-[#1c2e24] border border-border-dark rounded-md p-3 space-y-1">
        <p className="text-[10px] text-slate-400 font-mono">
          true  → condition passes
        </p>
        <p className="text-[10px] text-slate-400 font-mono">
          false → condition fails
        </p>
      </div>
    </div>
  );
}
// ─── Config panel router ──────────────────────────────────────────────────────

function NodeConfigPanel({
  nodeType,
  data,
  update,
}: {
  nodeType: string;
  data: any;
  update: (d: any) => void;
}) {
  switch (nodeType) {
    case "document_upload": return <DocumentUploadConfig data={data} update={update} />;
    case "phi_detector":    return <PHIDetectorConfig data={data} update={update} />;
    case "source_validator":return <ValidatorConfig data={data} update={update} />;
    case "rag_tm":          return <RAGConfig data={data} update={update} />;
    case "translation":     return <TranslationConfig data={data} update={update} />;
    case "compliance":      return <ComplianceConfig data={data} update={update} />;
    case "llm_agent":       return <LLMAgentConfig data={data} update={update} />;
    case "vector_db":       return <VectorDBConfig data={data} update={update} />;
    case "comet_qe":        return <COMETConfig data={data} update={update} />;
    case "learning":        return <LearningConfig data={data} update={update} />;
    case "output":          return <OutputConfig data={data} update={update} />;
    case "text_input":      return <TextInputConfig data={data} update={update} />;
    case "document_output": return <OutputConfig data={data} update={update} />;
    case "if_else":         return <IFElseConfig data={data} update={update} />;
    default:
      return (
        <p className="text-xs text-slate-500">
          No configurable properties for this node.
        </p>
      );
  }
}

// ─── Main sidebar ─────────────────────────────────────────────────────────────

export function PropertiesSidebar({
  isOpen,
  selectedNode,
  updateNodeData,
  deleteSelectedNode,
}: PropertiesSidebarProps) {
  return (
    <aside
      className={`bg-[#111813] border-l border-border-dark flex flex-col z-10 shadow-xl transition-all duration-300 ease-in-out ${
        isOpen
          ? "w-80 translate-x-0"
          : "w-0 translate-x-full overflow-hidden border-none"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border-dark flex items-center justify-between min-w-[20rem]">
        <h3 className="text-sm font-bold text-white">Properties</h3>
        <button
          onClick={deleteSelectedNode}
          disabled={!selectedNode}
          className="material-symbols-outlined text-slate-400 hover:text-red-400 cursor-pointer text-[18px] disabled:opacity-30 disabled:cursor-not-allowed"
          title="Delete Node"
        >
          delete
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 min-w-[20rem]">
        {!selectedNode ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3 opacity-60">
            <span className="material-symbols-outlined text-4xl">ads_click</span>
            <p className="text-sm text-center">
              Select a node on the canvas
              <br />
              to edit its properties
            </p>
          </div>
        ) : (
          <>
            {/* Node header */}
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded ${selectedNode.data.iconBg} ${selectedNode.data.iconColor} shrink-0`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {selectedNode.data.icon}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-white">
                  {selectedNode.data.label}
                </h3>
                <p className="text-xs text-slate-500 font-mono truncate">
                  {selectedNode.id}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border-dark" />

            {/* Sublabel / description — always shown */}
            <Field label="Description">
              <TextInput
                value={selectedNode.data.sublabel || ""}
                onChange={(v) => updateNodeData({ sublabel: v })}
                placeholder="Optional note..."
              />
            </Field>

            {/* Node-specific config */}
            <NodeConfigPanel
              nodeType={selectedNode.data.nodeType}
              data={selectedNode.data}
              update={updateNodeData}
            />
          </>
        )}
      </div>
    </aside>
  );
}