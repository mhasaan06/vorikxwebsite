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

-- Migration: Add live_url & is_concept columns if not present
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS live_url TEXT NULL;
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS is_concept BOOLEAN NULL DEFAULT false;

-- Upsert All 9 Project Rows (Real Work + 1 Demo/Concept Per Service)
INSERT INTO public.portfolio_projects (title, slug, category, summary, case_study_content, cover_image_url, live_url, is_featured, is_concept, display_order)
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
    false,
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
    false,
    2
  ),
  (
    'Aura Health & Wellness Design System',
    'aura-wellness-design-system',
    'UI/UX Design',
    'Comprehensive cross-platform design tokens, accessible components, and high-fidelity interactive prototype for digital healthcare.',
    'Figma design tokens, WCAG 2.1 AA accessible contrast rating, and responsive interactive prototypes for modern healthcare.',
    '/projects/aura-design.png',
    null,
    true,
    true,
    3
  ),
  (
    'NovaSaaS Product Launch & Motion Graphics Suite',
    'nova-commercial-motion-suite',
    'Video Editing',
    'Cinematic 3D commercial explainer, kinetic typography, and high-conversion vertical social video campaign.',
    'Multi-format video campaign combining 3D product motion graphics, sound design, hook-driven vertical reels, and cinematic color grading.',
    '/projects/nova-motion.png',
    null,
    false,
    true,
    4
  ),
  (
    'Pulse Omnichannel Social Growth Campaign',
    'pulse-growth-omnichannel',
    'Social Media',
    'Strategic content calendar, branded carousel system, and data-driven community growth playbook.',
    'Omnichannel growth engine featuring 30-day content pillars, viral carousel templates, active community engagement, and conversion tracking.',
    '/projects/pulse-growth.png',
    null,
    false,
    true,
    5
  ),
  (
    'FinVault Mobile Trading & Wallet',
    'fintech-trading-platform',
    'Mobile App',
    'Fluid cross-platform mobile trading experience with biometric authentication and real-time ticker streaming.',
    'Cross-platform mobile client with 60fps gesture navigation, biometric Face ID auth, and encrypted local database caching.',
    '/projects/fintech-mobile.png',
    null,
    true,
    true,
    6
  ),
  (
    'DocuMind AI Document Intelligence',
    'documind-ai',
    'AI & Automation',
    'AI-powered document processing system that extracts, classifies, and routes business records using custom LLMs.',
    'Intelligent document extraction pipeline leveraging vision-language models, structured JSON parsing, and autonomous verification agents.',
    '/projects/documind-ai.png',
    null,
    true,
    true,
    7
  ),
  (
    'Nexus Distributed API Gateway',
    'nexus-api-gateway',
    'Backend/API',
    'High-throughput microservices routing layer with token bucket rate limiting and sub-15ms p99 latency.',
    'Lightweight compiled gateway in Go featuring distributed Redis rate-limiting, gRPC trans-coding, and OpenTelemetry tracing.',
    '/projects/nexus-api.png',
    null,
    false,
    true,
    8
  ),
  (
    'Stratus Multi-Region Cloud & CI/CD Pipeline',
    'stratus-cloud-orchestrator',
    'Cloud/DevOps',
    'Automated multi-region infrastructure as code with zero-downtime canary deployments and Prometheus monitoring.',
    'Terraform IaC modules, automated GitHub Actions CI/CD workflows, and containerized Kubernetes clusters with self-healing pods.',
    '/projects/stratus-cloud.png',
    null,
    false,
    true,
    9
  )
ON CONFLICT (slug) DO UPDATE 
SET 
  live_url = EXCLUDED.live_url,
  cover_image_url = EXCLUDED.cover_image_url,
  summary = EXCLUDED.summary,
  case_study_content = EXCLUDED.case_study_content,
  is_featured = EXCLUDED.is_featured,
  is_concept = EXCLUDED.is_concept,
  display_order = EXCLUDED.display_order;
