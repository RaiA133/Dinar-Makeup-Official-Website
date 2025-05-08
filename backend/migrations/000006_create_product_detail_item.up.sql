-- Tabel product_detail_item
CREATE TABLE product_detail_item (
                                     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                                     group_id UUID NOT NULL,
                                     description TEXT NOT NULL,
                                     created_at BIGINT NOT NULL,
                                     updated_at BIGINT NOT NULL,
                                     CONSTRAINT fk_product_detail_group FOREIGN KEY (group_id) REFERENCES product_detail_group(id) ON DELETE CASCADE
);
