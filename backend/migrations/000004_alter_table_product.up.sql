-- Tambah kolom currency dan notes ke tabel product
ALTER TABLE product
    ADD COLUMN currency VARCHAR(10) NOT NULL DEFAULT 'IDR',
    ADD COLUMN notes TEXT;
