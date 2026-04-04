CREATE INDEX idx_users_email ON users(email);

CREATE INDEX idx_agents_user ON agents(created_by);

CREATE INDEX idx_workflows_agent ON workflows(agent_id);

CREATE INDEX idx_executions_agent ON executions(agent_id);
CREATE INDEX idx_executions_workflow ON executions(workflow_id);