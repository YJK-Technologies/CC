
-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table to store both ongoing and completed projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date TEXT,
  completion_date TEXT,
  completion_percentage INTEGER DEFAULT 0,
  project_type TEXT NOT NULL, -- 'Commercial', 'Hospitality', etc.
  status TEXT NOT NULL DEFAULT 'ongoing', -- 'ongoing' or 'completed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access to projects (no RLS for now, will add proper auth later)
CREATE POLICY "Allow all operations on projects" ON public.projects FOR ALL USING (true);

-- Insert a default admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash) 
VALUES ('admin@citycoolhvacr.com', '$2a$10$rOvHpQZKm1Fq8Hn8V8Hn8OgKZ8Hn8V8Hn8OgKZ8Hn8V8Hn8OgKZ8H');

-- Insert existing projects data
INSERT INTO public.projects (title, location, description, start_date, completion_percentage, project_type, status) VALUES
('Bahrain International Airport Terminal Expansion', 'Muharraq, Bahrain', 'Complete HVACR system installation for new departure lounge', 'March 2024', 75, 'Commercial', 'ongoing'),
('Al Areen Resort & Spa Renovation', 'Riffa, Bahrain', 'Upgrading central cooling system and guest room units', 'February 2024', 60, 'Hospitality', 'ongoing'),
('Seef Mall Cold Storage Facility', 'Seef, Bahrain', 'Installation of advanced cold room systems for food court', 'April 2024', 40, 'Retail', 'ongoing');

INSERT INTO public.projects (title, location, description, completion_date, project_type, status) VALUES
('Four Seasons Hotel HVAC Overhaul', 'Bahrain Bay, Bahrain', 'Complete replacement of central air conditioning system', 'January 2024', 'Hospitality', 'completed'),
('Bahrain Financial Harbor Office Complex', 'Manama, Bahrain', 'Installation of energy-efficient HVAC systems across 15 floors', 'December 2023', 'Commercial', 'completed'),
('Royal Hospital Medical Center', 'Riffa, Bahrain', 'Critical care unit climate control system installation', 'November 2023', 'Healthcare', 'completed'),
('University of Bahrain Library Complex', 'Sakhir, Bahrain', 'Ductwork installation and central cooling system', 'October 2023', 'Education', 'completed'),
('City Centre Bahrain Food Court', 'Manama, Bahrain', 'Cold storage and refrigeration systems for 20+ restaurants', 'September 2023', 'Retail', 'completed'),
('Diplomat Radisson Blu Hotel', 'Diplomatic Area, Bahrain', 'Guest room AC units replacement and maintenance setup', 'August 2023', 'Hospitality', 'completed');
