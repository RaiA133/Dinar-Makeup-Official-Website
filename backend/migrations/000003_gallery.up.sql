-- Mengaktifkan ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Tabel gallery
CREATE TABLE gallery (
                         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                         title VARCHAR(255),
                         caption VARCHAR(255),
                         description TEXT,
                         image_url VARCHAR(255),
                         created_at BIGINT NOT NULL,
                         updated_at BIGINT NOT NULL,
                         deleted_at BIGINT  -- Menandai waktu penghapusan logis
);
