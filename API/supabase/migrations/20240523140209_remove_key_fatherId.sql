SELECT
    conname
FROM
    pg_constraint
WHERE
    conrelid = 'sections'::regclass
    AND confrelid = 'sections'::regclass;