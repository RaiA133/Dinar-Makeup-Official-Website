CREATE TABLE customer_details (
                                 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                 order_id UUID NOT NULL,
                                 groom_full_name VARCHAR(255),
                                 bride_full_name VARCHAR(255),
                                 groom_address VARCHAR(255),
                                 bride_address VARCHAR(255),
                                 groom_email VARCHAR(255),
                                 bride_email VARCHAR(255),
                                 groom_instagram VARCHAR(255),
                                 bride_instagram VARCHAR(255),
                                 FOREIGN KEY (order_id) REFERENCES orders(id)
);

