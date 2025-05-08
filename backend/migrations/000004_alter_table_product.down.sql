-- Menghapus kolom currency dan notes dari tabel product
ALTER TABLE product
DROP COLUMN IF EXISTS currency,
DROP COLUMN IF EXISTS notes;
