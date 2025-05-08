-- Mengaktifkan ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabel product_detail_group
CREATE TABLE product_detail_group (
                                      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                                      product_id UUID NOT NULL,
                                      group_name VARCHAR(255) NOT NULL,
                                      created_at BIGINT NOT NULL,
                                      updated_at BIGINT NOT NULL,
                                      CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);
