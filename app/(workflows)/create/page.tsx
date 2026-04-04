"use client";

import React, { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Import your split components
import { nodeTypes } from "@/components/workflow-builder/CustomNode";
import { NodeLibrarySidebar } from "@/components/workflow-builder/NodeLibrarySidebar";
import { PropertiesSidebar } from "@/components/workflow-builder/PropertiesSidebar";
import { WorkflowHeader } from "@/components/workflow-builder/WorkflowHeader";
import { saveWorkflowState, getWorkflow } from "@/app/actions/workflow";

// Unique ID generator
const getId = () => `node_${crypto.randomUUID()}`;

function WorkflowEditor() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  
  // Get Workflow ID from URL (?id=...)
  const searchParams = useSearchParams();
  const workflowId = searchParams.get("id");

  // Sidebar Toggles
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(false);

  // Flow State
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [workflowName, setWorkflowName] = useState<string>("");
  
  // Saving State
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // --- AUTO-SAVE LOGIC ---
  useEffect(() => {
    if (!workflowId) return;

    // Debounce: Wait 1 second after the user stops making changes before saving
    const saveTimer = setTimeout(async () => {
      setIsSaving(true);
      const result = await saveWorkflowState(workflowId, nodes, edges);
      
      if (!result?.error) {
        setLastSaved(new Date());
      }
      setIsSaving(false);
    }, 1000);

    // Clear timeout if nodes/edges change again before the 1 second is up
    return () => clearTimeout(saveTimer);
  }, [nodes, edges, workflowId]);

  // --- LOAD INITIAL DATA ---
  useEffect(() => {
    if (!workflowId) return;

    async function loadData() {
      // Add "as string" here 👇
      const data = await getWorkflow(workflowId as string); 
      if (data) {
        setWorkflowName(data.name || "Untitled Workflow");
        
        if (data.nodes && data.nodes.length > 0) {
          setNodes(data.nodes);
        }
        if (data.edges && data.edges.length > 0) {
          setEdges(data.edges);
        }
      }
    }

    loadData();
  }, [workflowId, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) => {
        const newEdge: Edge = {
          ...params,
          id: 'id' in params ? params.id : `e-${params.source}-${params.target}`,
          animated: true,
          style: { stroke: "#9db9a6", strokeWidth: 2 },
        } as Edge;

        return addEdge(newEdge, eds);
      }),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const nodeDataStr = event.dataTransfer.getData("application/reactflow");

      if (!nodeDataStr || !reactFlowBounds) return;

      const nodeData = JSON.parse(nodeDataStr);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type: "customNode",
        position,
        data: nodeData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    setRightOpen(true);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const deleteSelectedNode = useCallback(() => {
    if (!selectedNodeId) return;
    setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
    setSelectedNodeId(null);
  }, [selectedNodeId, setNodes, setEdges]);

  const updateNodeData = (newData: any) => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      })
    );
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0A0F0C] relative">
      
      <WorkflowHeader 
        leftOpen={leftOpen}
        setLeftOpen={setLeftOpen}
        rightOpen={rightOpen}
        setRightOpen={setRightOpen}
        workflowName={workflowName} // Pass the fetched name here
        workflowId={workflowId}     />

      {/* Floating Save Indicator */}
      <div className="absolute top-20 left-15/16 -translate-x-1/2 z-50 pointer-events-none ml-4">
        {isSaving && (
          <div className="bg-emerald-900/80 border border-emerald-500/50 text-emerald-100 text-xs px-1.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-top-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <NodeLibrarySidebar isOpen={leftOpen} />

        {/* Center Canvas */}
        <div className="flex-1 relative h-full w-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            colorMode="dark"
            fitView
            className="bg-[#0A0F0C]"
            deleteKeyCode={["Backspace", "Delete"]}
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#28392e" />
            <Controls className="bg-[#111813]! border-border-dark! fill-white!" />
            <MiniMap
              className="bg-[#111813]! border! border-border-dark! rounded-lg overflow-hidden"
              nodeColor="#13ec5b"
              maskColor="rgba(0, 0, 0, 0.7)"
            />
          </ReactFlow>

          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-slate-500 font-medium bg-black/40 px-6 py-3 rounded-xl border border-border-dark flex items-center gap-3 backdrop-blur-md">
                <span className="material-symbols-outlined text-2xl">drag_indicator</span>
                Drag nodes from the library to begin
              </div>
            </div>
          )}
        </div>

        <PropertiesSidebar 
          isOpen={rightOpen} 
          selectedNode={selectedNode} 
          updateNodeData={updateNodeData}
          deleteSelectedNode={deleteSelectedNode}
        />
      </div>
    </main>
  );
}

// Next.js requires useSearchParams to be wrapped in a Suspense boundary
export default function CreateWorkflowPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#0A0F0C] flex items-center justify-center text-emerald-500">Loading editor...</div>}>
      <ReactFlowProvider>
        <WorkflowEditor />
      </ReactFlowProvider>
    </Suspense>
  );
}

// **** SINGLE PAGE OLD CODE ****

// "use client";

// import React, { useState, useCallback, useRef } from "react";
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Handle,
//   Position,
//   BackgroundVariant,
//   Connection,
//   Edge,
//   ReactFlowProvider,
//   useReactFlow,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";

// // --- 1. ID Generator for New Nodes ---
// let id = 0;
// const getId = () => `node_${id++}`;

// // --- 2. Custom Node Component ---
// const CustomNode = ({ data, selected }: { data: any; selected: boolean }) => {
//   return (
//     <div
//       className={`w-[280px] rounded-xl border bg-[#162e1e]/90 backdrop-blur-md shadow-2xl transition-all ${
//         selected
//           ? "border-primary ring-1 ring-primary/50"
//           : "border-border-dark"
//       }`}
//     >
//       <Handle
//         type="target"
//         position={Position.Left}
//         className="!w-3 !h-3 !bg-slate-500 !border-2 !border-[#111813]"
//       />

//       <div className="p-4">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-3">
//             <div
//               className={`w-8 h-8 rounded-lg flex items-center justify-center ${data.iconBg} ${data.iconColor}`}
//             >
//               <span className="material-symbols-outlined text-[18px]">
//                 {data.icon}
//               </span>
//             </div>
//             <div className="font-bold text-white text-sm">{data.label}</div>
//           </div>
//           <span className="material-symbols-outlined text-slate-500 text-[18px]">
//             more_horiz
//           </span>
//         </div>

//         <div className="text-xs text-slate-400 font-mono bg-black/20 p-2 rounded border border-border-dark whitespace-pre-wrap">
//           {data.sublabel}
//         </div>

//         {data.badge && (
//           <div className="mt-3 flex items-center gap-1.5">
//             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//             <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
//               {data.badge}
//             </span>
//           </div>
//         )}
//       </div>

//       <Handle
//         type="source"
//         position={Position.Right}
//         className="!w-3 !h-3 !bg-primary !border-2 !border-[#111813]"
//       />
//     </div>
//   );
// };

// const nodeTypes = {
//   customNode: CustomNode,
// };

// // --- 3. The Interactive Editor Component ---
// function WorkflowEditor() {
//   const reactFlowWrapper = useRef<HTMLDivElement>(null);
//   const { screenToFlowPosition } = useReactFlow();

//   // Sidebar States
//   const [leftOpen, setLeftOpen] = useState(true);
//   const [rightOpen, setRightOpen] = useState(true);

//   // Nodes & Edges State
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//   // Selected Node State
//   const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

//   // Connection Handler
//   const onConnect = useCallback(
//     (params: Connection | Edge) =>
//       setEdges((eds) =>
//         addEdge({ ...params, animated: true, style: { stroke: "#9db9a6", strokeWidth: 2 } }, eds)
//       ),
//     [setEdges]
//   );

//   // --- DRAG AND DROP LOGIC ---
//   const onDragStart = (event: React.DragEvent, nodeData: any) => {
//     event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeData));
//     event.dataTransfer.effectAllowed = "move";
//   };

//   const onDragOver = useCallback((event: React.DragEvent) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   const onDrop = useCallback(
//     (event: React.DragEvent) => {
//       event.preventDefault();
//       const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
//       const nodeDataStr = event.dataTransfer.getData("application/reactflow");

//       if (!nodeDataStr || !reactFlowBounds) return;

//       const nodeData = JSON.parse(nodeDataStr);
//       const position = screenToFlowPosition({
//         x: event.clientX,
//         y: event.clientY,
//       });

//       const newNode = {
//         id: getId(),
//         type: "customNode",
//         position,
//         data: nodeData,
//       };

//       setNodes((nds) => nds.concat(newNode));
//     },
//     [screenToFlowPosition, setNodes]
//   );

//   // --- SELECTION & DELETION ---
//   const onNodeClick = useCallback((_: React.MouseEvent, node: any) => {
//     setSelectedNodeId(node.id);
//     if (!rightOpen) setRightOpen(true); // Auto-open properties if closed
//   }, [rightOpen]);

//   const onPaneClick = useCallback(() => {
//     setSelectedNodeId(null);
//   }, []);

//   const deleteSelectedNode = useCallback(() => {
//     if (!selectedNodeId) return;
//     setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
//     setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
//     setSelectedNodeId(null);
//   }, [selectedNodeId, setNodes, setEdges]);

//   // Update specific node data from properties panel
//   const updateNodeData = (newData: any) => {
//     if (!selectedNodeId) return;
//     setNodes((nds) =>
//       nds.map((node) => {
//         if (node.id === selectedNodeId) {
//           return { ...node, data: { ...node.data, ...newData } };
//         }
//         return node;
//       })
//     );
//   };

//   const selectedNode = nodes.find((n) => n.id === selectedNodeId);

//   return (
//     <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0A0F0C]">
//       {/* HEADER */}
//       <header className="flex items-center justify-between px-6 py-3 border-b border-border-dark bg-[#111813] z-20">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => setLeftOpen(!leftOpen)}
//             className={`p-2 rounded-lg transition-colors ${leftOpen ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-surface-dark'}`}
//             title="Toggle Node Library"
//           >
//             <span className="material-symbols-outlined text-[20px]">account_tree</span>
//           </button>
//           <div className="flex flex-col">
//             <div className="flex items-center gap-2">
//               <h2 className="text-lg font-bold text-white tracking-tight">Emergency Triage V2</h2>
//               <span className="text-[10px] font-bold text-slate-400 border border-border-dark px-1.5 py-0.5 rounded bg-surface-dark">
//                 v2.4
//               </span>
//             </div>
//             <p className="text-xs text-slate-500">
//               Workflows <span className="mx-1">›</span> Patient Intake
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#111813] bg-primary rounded hover:bg-[#0e9f6e] transition-colors">
//             <span className="material-symbols-outlined text-[18px]">play_arrow</span>
//             Simulate Call
//           </button>
//           <button 
//             onClick={() => setRightOpen(!rightOpen)}
//             className={`p-2 rounded-lg transition-colors ml-2 ${rightOpen ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-surface-dark'}`}
//             title="Toggle Properties"
//           >
//             <span className="material-symbols-outlined text-[20px]">tune</span>
//           </button>
//         </div>
//       </header>

//       {/* EDITOR AREA */}
//       <div className="flex-1 flex overflow-hidden relative">
        
//         {/* LEFT SIDEBAR: Node Library (Collapsible) */}
//         <aside 
//           className={`bg-[#111813] border-r border-border-dark flex flex-col z-10 shadow-xl transition-all duration-300 ease-in-out ${leftOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full overflow-hidden border-none'}`}
//         >
//           <div className="p-4 border-b border-border-dark min-w-[18rem]">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
//               Node Library
//             </h3>
//             <div className="relative">
//               <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-[18px]">
//                 search
//               </span>
//               <input
//                 type="text"
//                 placeholder="Search nodes..."
//                 className="w-full bg-[#1c2e24] border border-border-dark rounded p-2 pl-9 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary"
//               />
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4 space-y-6 min-w-[18rem]">
//             {/* Category: Voice & Input */}
//             <div>
//               <h4 className="text-xs font-semibold text-slate-500 mb-3">Voice & Input</h4>
//               <div className="space-y-2">
//                 <div
//                   onDragStart={(e) => onDragStart(e, { label: "Inbound Call", sublabel: "Source: Undefined", icon: "call", iconBg: "bg-blue-900/30", iconColor: "text-blue-400", badge: "Active" })}
//                   draggable
//                   className="flex items-center gap-3 p-2.5 rounded-lg border border-border-dark bg-[#1c2e24] hover:border-primary/50 cursor-grab active:cursor-grabbing transition-colors"
//                 >
//                   <div className="p-1.5 rounded bg-blue-900/30 text-blue-400">
//                     <span className="material-symbols-outlined text-[18px]">call</span>
//                   </div>
//                   <div>
//                     <div className="text-sm font-bold text-white">Inbound Call</div>
//                     <div className="text-[10px] text-slate-400">Twilio / Sip trunk</div>
//                   </div>
//                 </div>
                
//                 <div
//                   onDragStart={(e) => onDragStart(e, { label: "Speech-to-Text", sublabel: "Language: Auto-detect", icon: "graphic_eq", iconBg: "bg-purple-900/30", iconColor: "text-purple-400" })}
//                   draggable
//                   className="flex items-center gap-3 p-2.5 rounded-lg border border-border-dark bg-[#1c2e24] hover:border-primary/50 cursor-grab active:cursor-grabbing transition-colors"
//                 >
//                   <div className="p-1.5 rounded bg-purple-900/30 text-purple-400">
//                     <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
//                   </div>
//                   <div>
//                     <div className="text-sm font-bold text-white">Speech-to-Text</div>
//                     <div className="text-[10px] text-slate-400">Deepgram / Whisper</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Category: AI & Logic */}
//             <div>
//               <h4 className="text-xs font-semibold text-slate-500 mb-3">AI & Logic</h4>
//               <div className="space-y-2">
//                 <div
//                   onDragStart={(e) => onDragStart(e, { label: "LLM Chain", sublabel: "Model: GPT-4 Turbo", icon: "smart_toy", iconBg: "bg-emerald-900/30", iconColor: "text-emerald-400" })}
//                   draggable
//                   className="flex items-center gap-3 p-2.5 rounded-lg border border-primary/50 bg-[#1c2e24] cursor-grab active:cursor-grabbing relative overflow-hidden"
//                 >
//                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
//                   <div className="p-1.5 rounded bg-emerald-900/30 text-emerald-400 ml-1">
//                     <span className="material-symbols-outlined text-[18px]">smart_toy</span>
//                   </div>
//                   <div>
//                     <div className="text-sm font-bold text-white">LLM Chain</div>
//                     <div className="text-[10px] text-slate-400">GPT-4 / Claude 3</div>
//                   </div>
//                 </div>
                
//                 <div
//                   onDragStart={(e) => onDragStart(e, { label: "Knowledge Base", sublabel: "Search Type: Vector RAG", icon: "library_books", iconBg: "bg-orange-900/30", iconColor: "text-orange-400" })}
//                   draggable
//                   className="flex items-center gap-3 p-2.5 rounded-lg border border-border-dark bg-[#1c2e24] hover:border-primary/50 cursor-grab active:cursor-grabbing transition-colors"
//                 >
//                   <div className="p-1.5 rounded bg-orange-900/30 text-orange-400">
//                     <span className="material-symbols-outlined text-[18px]">library_books</span>
//                   </div>
//                   <div>
//                     <div className="text-sm font-bold text-white">Knowledge Base</div>
//                     <div className="text-[10px] text-slate-400">Vector Search (RAG)</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* CENTER: React Flow Canvas */}
//         <div className="flex-1 relative h-full w-full" ref={reactFlowWrapper}>
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             onInit={() => {}}
//             onDrop={onDrop}
//             onDragOver={onDragOver}
//             onNodeClick={onNodeClick}
//             onPaneClick={onPaneClick}
//             nodeTypes={nodeTypes}
//             colorMode="dark"
//             fitView
//             className="bg-[#0A0F0C]"
//             deleteKeyCode={['Backspace', 'Delete']}
//           >
//             <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#28392e" />
//             <Controls className="!bg-[#111813] !border-border-dark !fill-white" />
//             <MiniMap
//               className="!bg-[#111813] !border !border-border-dark rounded-lg overflow-hidden"
//               nodeColor="#13ec5b"
//               maskColor="rgba(0, 0, 0, 0.7)"
//             />
//           </ReactFlow>
          
//           {/* Helper hint when empty */}
//           {nodes.length === 0 && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <div className="text-slate-500 font-medium bg-black/40 px-6 py-3 rounded-xl border border-border-dark flex items-center gap-3 backdrop-blur-md">
//                 <span className="material-symbols-outlined text-2xl">drag_indicator</span>
//                 Drag nodes from the library to begin
//               </div>
//             </div>
//           )}
//         </div>

//         {/* RIGHT SIDEBAR: Properties (Collapsible) */}
//         <aside 
//           className={`bg-[#111813] border-l border-border-dark flex flex-col z-10 shadow-xl transition-all duration-300 ease-in-out ${rightOpen ? 'w-80 translate-x-0' : 'w-0 translate-x-full overflow-hidden border-none'}`}
//         >
//           <div className="p-4 border-b border-border-dark flex items-center justify-between min-w-[20rem]">
//             <h3 className="text-sm font-bold text-white">Properties</h3>
//             <div className="flex gap-2">
//               <button 
//                 onClick={deleteSelectedNode}
//                 disabled={!selectedNode}
//                 className="material-symbols-outlined text-slate-400 hover:text-red-400 cursor-pointer text-[18px] disabled:opacity-30 disabled:cursor-not-allowed"
//                 title="Delete Node"
//               >
//                 delete
//               </button>
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto p-5 space-y-6 min-w-[20rem]">
//             {!selectedNode ? (
//               <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3 opacity-60">
//                 <span className="material-symbols-outlined text-4xl">ads_click</span>
//                 <p className="text-sm text-center">Select a node on the canvas<br/>to edit its properties</p>
//               </div>
//             ) : (
//               <>
//                 {/* Active Node Header */}
//                 <div className="flex items-start gap-3">
//                   <div className={`p-2 rounded ${selectedNode.data.iconBg} ${selectedNode.data.iconColor}`}>
//                     <span className="material-symbols-outlined text-[24px]">
//                       {selectedNode.data.icon}
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="text-base font-bold text-white">{selectedNode.data.label}</h3>
//                     <p className="text-xs text-slate-500 font-mono">ID: {selectedNode.id}</p>
//                   </div>
//                 </div>

//                 {/* Sublabel / Source Editor */}
//                 <div className="space-y-2">
//                   <label className="text-xs font-semibold text-slate-400">Description / Sublabel</label>
//                   <input 
//                     type="text"
//                     value={selectedNode.data.sublabel || ""}
//                     onChange={(e) => updateNodeData({ sublabel: e.target.value })}
//                     className="w-full bg-[#1c2e24] border border-border-dark rounded-md p-2.5 text-sm text-white outline-none focus:border-primary"
//                   />
//                 </div>

//                 {/* Extra Properties based on node type (Mock example for LLM Chain) */}
//                 {selectedNode.data.label === "LLM Chain" && (
//                   <>
//                     <div className="space-y-2">
//                       <label className="text-xs font-semibold text-slate-400">Model</label>
//                       <select className="w-full bg-[#1c2e24] border border-border-dark rounded-md p-2.5 text-sm text-white appearance-none outline-none focus:border-primary">
//                         <option>GPT-4 Turbo (128k)</option>
//                         <option>Claude 3 Opus</option>
//                         <option>Med-PaLM 2</option>
//                       </select>
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <label className="text-xs font-semibold text-slate-400">System Prompt</label>
//                         <span className="text-[10px] text-primary cursor-pointer hover:underline">Expand Editor</span>
//                       </div>
//                       <textarea
//                         rows={5}
//                         className="w-full bg-[#1c2e24] border border-border-dark rounded-md p-3 text-sm text-emerald-100/80 font-mono outline-none focus:border-primary resize-none"
//                         defaultValue={`You are an emergency triage nurse assistant. Your goal is to collect symptoms, assess severity, and categorize urgency. Be empathetic but concise.`}
//                       />
//                     </div>
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </aside>
//       </div>
//     </main>
//   );
// }

// // --- 4. Main Export wrapped in Provider ---
// // React Flow requires a Provider to translate DOM coordinates to flow coordinates
// export default function CreateWorkflowPage() {
//   return (
//     <ReactFlowProvider>
//       <WorkflowEditor />
//     </ReactFlowProvider>
//   );
// }