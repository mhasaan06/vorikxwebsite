-- ============================================
-- VORIKX Live Supabase Database Schema
-- ============================================

-- 1. Clients Table
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NULL,
  phone TEXT NULL,
  notes TEXT NULL,
  CONSTRAINT clients_pkey PRIMARY KEY (id)
);

-- 2. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NULL DEFAULT 'unread'::text,
  CONSTRAINT contact_messages_status_check CHECK (
    status = ANY (ARRAY['unread'::text, 'read'::text, 'replied'::text])
  )
);

-- 3. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NULL,
  case_study_content TEXT NULL,
  cover_image_url TEXT NULL,
  gallery_urls TEXT[] NULL,
  live_url TEXT NULL,
  is_featured BOOLEAN NULL DEFAULT false,
  display_order INTEGER NULL DEFAULT 0,
  CONSTRAINT portfolio_projects_slug_key UNIQUE (slug)
);

-- 4. Project Requests Table
CREATE TABLE IF NOT EXISTS public.project_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NULL,
  company_name TEXT NULL,
  service_type TEXT NOT NULL,
  project_details TEXT NOT NULL,
  budget_range TEXT NULL,
  timeline TEXT NULL,
  additional_info TEXT NULL,
  status TEXT NULL DEFAULT 'new'::text,
  CONSTRAINT project_requests_status_check CHECK (
    status = ANY (ARRAY[
      'new'::text, 'reviewing'::text, 'proposal_sent'::text,
      'in_progress'::text, 'completed'::text, 'declined'::text
    ])
  )
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public insert on project_requests" ON public.project_requests FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public insert on contact_messages" ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public read on portfolio_projects" ON public.portfolio_projects FOR SELECT TO anon USING (true);

-- ============================================
-- Migrations & Initial Seed Data
-- ============================================

-- Migration: Add live_url column if not present
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS live_url TEXT NULL;

-- Upsert BHDS and SkillSwap Project Rows
INSERT INTO public.portfolio_projects (title, slug, category, summary, case_study_content, cover_image_url, live_url, is_featured, display_order)
VALUES 
  (
    'Bin Hayat Dollar Store (BHDS)',
    'bhds-inventory-system',
    'Custom Software',
    'Custom dual-mode inventory management system and restricted staff portal engineered for Dr. Muhammad Amin.',
    'Bespoke inventory dashboard featuring stock expiration alerts, real-time depletion tracking, and restricted staff roles designed to eliminate manual paper registers.',
    '/projects/bhds.png',
    'https://binhayat-dollarstore.vercel.app/',
    true,
    1
  ),
  (
    'SkillSwap Learning Platform',
    'skillswap-learning-platform',
    'Web Platform',
    'Interactive peer-to-peer skill exchange platform connecting learners and mentors with live booking.',
    'High-throughput web application built with real-time WebSockets, calendar booking, and reciprocal skill credits.',
    '/projects/skillswap.png',
    'https://skillswap06.vercel.app/',
    true,
    2
  )
ON CONFLICT (slug) DO UPDATE 
SET 
  live_url = EXCLUDED.live_url,
  cover_image_url = EXCLUDED.cover_image_url,
  summary = EXCLUDED.summary,
  case_study_content = EXCLUDED.case_study_content,
  is_featured = EXCLUDED.is_featured,
  display_order = EXCLUDED.display_order;
