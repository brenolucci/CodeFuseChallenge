ALTER TABLE sections
DROP COLUMN section_father_id;

ALTER TABLE sections
ADD COLUMN section_father_id TEXT;
