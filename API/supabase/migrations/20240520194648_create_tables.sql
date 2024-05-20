-- Criação da tabela livros
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    isbn TEXT NOT NULL,
    pagesQuantity INT NOT NULL
);

-- Criação da tabela seções
CREATE TABLE sections (
    id SERIAL PRIMARY KEY,
    pageNumberStart INT NOT NULL,
    pageNumberEnd INT NOT NULL,
    sectionName TEXT NOT NULL,
    sectionSequence TEXT NOT NULL,
    bookId INT NOT NULL,
    sectionFatherId INT,
    FOREIGN KEY (bookId) REFERENCES books (id) ON DELETE CASCADE,
    FOREIGN KEY (sectionFatherId) REFERENCES sections (id) ON DELETE CASCADE
);
