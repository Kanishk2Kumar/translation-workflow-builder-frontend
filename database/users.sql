CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,

  email TEXT UNIQUE NOT NULL,

  organization_name TEXT,
  role TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);