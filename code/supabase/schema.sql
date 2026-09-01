-- ============================================
-- VORIKX Supabase Schema
-- ============================================

-- Project requests from "Start a Project" form
CREATE TABLE IF NOT EXISTS project_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  services TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  goals TEXT,
  budget_range TEXT,
  timeline TEXT,
  additional_notes TEXT,
  file_urls TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'in_progress', 'completed', 'archived'))
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public inserts (for form submissions)
CREATE POLICY "Allow public insert on project_requests"
  ON project_requests FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on contact_messages"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users full access (admin)
CREATE POLICY "Allow authenticated full access on project_requests"
  ON project_requests FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated full access on contact_messages"
  ON contact_messages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Storage bucket for file uploads
-- Run this via Supabase dashboard or API:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', true);
