
CREATE TABLE document_orders (
                                 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                 order_id UUID NOT NULL,
                                 url VARCHAR(255),
                                 file_name VARCHAR(255),
                                 created_at BIGINT DEFAULT (extract(epoch FROM now()) * 1000)::BIGINT,
                                 updated_at BIGINT DEFAULT (extract(epoch FROM now()) * 1000)::BIGINT,
                                 CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
