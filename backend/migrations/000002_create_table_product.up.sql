-- Mengaktifkan ekstensi UUID  
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";    

-- Tabel Produk  
CREATE TABLE product (    
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,    
    name VARCHAR(255) NOT NULL,  
    price INT NOT NULL,    
    description TEXT,  
    created_at BIGINT NOT NULL,    
    updated_at BIGINT NOT NULL,  
    deleted_at BIGINT  -- Menandai waktu penghapusan logis  
);  

-- Tabel Gambar Produk  
CREATE TABLE product_image (  
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,  
    product_id UUID NOT NULL,  
    image_url VARCHAR(255) NOT NULL,  
    created_at BIGINT NOT NULL,  
    updated_at BIGINT NOT NULL,  
    deleted_at BIGINT,  -- Menandai waktu penghapusan logis  
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE  
);  