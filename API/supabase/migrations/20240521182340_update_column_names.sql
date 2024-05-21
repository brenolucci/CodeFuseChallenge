ALTER TABLE books
    RENAME COLUMN pagesQuantity TO pages_quantity;


ALTER TABLE sections
RENAME COLUMN pageNumberStart TO page_number_start;

ALTER TABLE sections
RENAME COLUMN pageNumberEnd TO page_number_end;

ALTER TABLE sections
RENAME COLUMN sectionName TO section_name;

ALTER TABLE sections
RENAME COLUMN sectionSequence TO section_sequence;

ALTER TABLE sections
RENAME COLUMN bookId TO book_id;

ALTER TABLE sections
RENAME COLUMN sectionFatherId TO section_father_id;
