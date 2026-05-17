-- Migration: remove phone column from rsvp

ALTER TABLE rsvp
  DROP COLUMN IF EXISTS phone;
