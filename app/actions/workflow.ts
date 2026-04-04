'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

// --- NEW: Fetch existing agents for the dropdown ---
export async function getAgents() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: dbUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', user.email)
    .single()

  if (!dbUser) return []

  const { data } = await supabase
    .from('agents')
    .select('id, name')
    .eq('created_by', dbUser.id)
    .order('created_at', { ascending: false })

  return data || []
}

// --- UPDATED: Create Workflow Logic ---
export async function createWorkflow(formData: FormData) {
  const supabase = createClient()
  
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
  if (authError || !authUser) return { error: "You must be logged in to create a workflow." }

  const { data: dbUser, error: dbUserError } = await supabase
    .from('users')
    .select('id')
    .eq('email', authUser.email)
    .single()

  if (dbUserError || !dbUser) return { error: "Could not find your user profile." }

  // Extract Workflow Details
  const workflowName = formData.get('workflowName') as string
  const workflowDescription = formData.get('workflowDescription') as string
  
  // Extract Agent Details
  const agentSelection = formData.get('agentSelection') as string
  let finalAgentId = agentSelection

  if (!workflowName) return { error: "Workflow name is required." }

  // If user selected "Create New Agent"
  if (agentSelection === 'new') {
    const agentName = formData.get('agentName') as string
    const agentDescription = formData.get('agentDescription') as string
    const authType = formData.get('authType') as string // 'none' or 'bearer'
    const authToken = formData.get('authToken') as string

    if (!agentName) return { error: "Agent name is required for new agents." }

    const { data: newAgent, error: agentError } = await supabase
      .from('agents')
      .insert([{ 
        name: agentName, 
        description: agentDescription, 
        auth_type: authType,
        auth_token: authType === 'bearer' ? authToken : null,
        created_by: dbUser.id 
      }])
      .select()
      .single()

    if (agentError) return { error: `Error creating agent: ${agentError.message}` }
    finalAgentId = newAgent.id
  }

  // Create the Workflow attached to the selected/new Agent
  const { data: workflow, error: workflowError } = await supabase
    .from('workflows')
    .insert([{ 
        name: workflowName,
        description: workflowDescription,
        agent_id: finalAgentId, 
        nodes: [], 
        edges: [] 
    }])
    .select()
    .single()

  if (workflowError) return { error: `Error creating workflow: ${workflowError.message}` }

  // Redirect to editor
  redirect(`/create?id=${workflow.id}`)
}

// Add to app/actions/workflow.ts
export async function saveWorkflowState(id: string, nodes: any[], edges: any[]) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('workflows')
    .update({ 
      nodes, 
      edges, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function getWorkflow(id: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching workflow:", error);
    return null;
  }
  
  return data;
}

export async function getWorkflows() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching workflows:", error.message);
    return [];
  }

  return data;
}

export async function deleteWorkflow(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("workflows")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}