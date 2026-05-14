-- supabase/migrations/001_create_rsvp_table.sql
CREATE TABLE rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  adult_attendees INTEGER NOT NULL DEFAULT 1,
  child_attendees INTEGER NOT NULL DEFAULT 0,
  valid_for INTEGER NOT NULL,
  will_attend BOOLEAN NOT NULL,
  message TEXT,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON rsvp
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public select" ON rsvp
  FOR SELECT TO anon USING (true);
