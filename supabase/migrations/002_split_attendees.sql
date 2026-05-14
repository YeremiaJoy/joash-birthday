-- Migration: split attendees into adult_attendees and child_attendees
ALTER TABLE rsvp
  ADD COLUMN adult_attendees INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN child_attendees INTEGER NOT NULL DEFAULT 0;

-- Migrate existing data: treat current attendees as all adults
UPDATE rsvp SET adult_attendees = attendees WHERE attendees IS NOT NULL;

ALTER TABLE rsvp DROP COLUMN attendees;
