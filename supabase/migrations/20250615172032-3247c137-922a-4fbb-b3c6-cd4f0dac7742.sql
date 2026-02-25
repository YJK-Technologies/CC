
-- Add image columns to the projects table
ALTER TABLE public.projects 
ADD COLUMN image_1 TEXT,
ADD COLUMN image_2 TEXT,
ADD COLUMN image_3 TEXT,
ADD COLUMN image_4 TEXT,
ADD COLUMN image_5 TEXT;

-- Create a storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Create storage policies for project images
CREATE POLICY "Allow public read access to project images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'project-images');

CREATE POLICY "Allow admin insert to project images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Allow admin update to project images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'project-images');

CREATE POLICY "Allow admin delete to project images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'project-images');
