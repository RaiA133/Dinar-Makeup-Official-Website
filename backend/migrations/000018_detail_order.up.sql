CREATE TABLE detail_orders (
                              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                              order_id UUID NOT NULL,
                              akad_date VARCHAR(255),
                              show_date VARCHAR(255),
                              location VARCHAR(255),
                              akad_time VARCHAR(255),
                              guest_count BIGINT,
                              tech_meeting VARCHAR(255),
                              FOREIGN KEY (order_id) REFERENCES orders(id)
);
