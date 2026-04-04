CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name TEXT NOT NULL,
  description TEXT,

  created_by UUID REFERENCES users(id) ON DELETE CASCADE,

  api_endpoint TEXT,

  auth_type TEXT DEFAULT 'none', -- 'none' or 'bearer'
  auth_token TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);