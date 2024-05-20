
create table
books (
id bigint primary key generated always as identity,
nameTitle text,
email text,
created_at timestamptz default now()
);