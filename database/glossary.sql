-- Glossary terms (user-specific, language-pair specific)
CREATE TABLE glossary_terms (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id) ON DELETE CASCADE,
  source_term    TEXT NOT NULL,
  source_lang    TEXT NOT NULL DEFAULT 'en',
  target_term    TEXT NOT NULL,
  target_lang    TEXT NOT NULL,
  domain         TEXT,                      -- 'cardiology', 'oncology', general
  case_sensitive BOOLEAN NOT NULL DEFAULT false,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT glossary_unique_pair
    UNIQUE (user_id, source_term, source_lang, target_lang)
);

CREATE INDEX glossary_user_lang_idx
  ON glossary_terms (user_id, source_lang, target_lang);

-- PII audit log — what was masked in each execution
CREATE TABLE pii_audit (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id   UUID REFERENCES executions(id) ON DELETE CASCADE,
  user_id        UUID REFERENCES users(id) ON DELETE SET NULL,
  phi_type       TEXT NOT NULL,             -- NAME, MRN, DOB, PHONE, EMAIL, etc.
  placeholder    TEXT NOT NULL,             -- {{PHI_0}}, {{PHI_1}} …
  original_value TEXT NOT NULL,             -- store encrypted in production
  segment_idx    INTEGER,                   -- which segment it came from
  detected_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX pii_audit_execution_idx ON pii_audit (execution_id);