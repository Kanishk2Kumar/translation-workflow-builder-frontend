CREATE TABLE executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  workflow_id UUID REFERENCES workflows(id) ON DELETE SET NULL,

  status TEXT CHECK (status IN ('running', 'success', 'failed')) DEFAULT 'running',

  input JSONB,
  output JSONB,

  logs JSONB, -- 🔥 your simplified logging approach

  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);