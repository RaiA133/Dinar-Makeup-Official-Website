CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders (
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        id_order VARCHAR(255),
                        user_id UUID NOT NULL,
                        product_id UUID NOT NULL,
                        final_amount BIGINT,
                        installment_amount BIGINT,
                        outstanding BIGINT,
                        installment_status VARCHAR(100),
                        va_number VARCHAR(100),
                        order_status VARCHAR(255),
                        payment_status VARCHAR(255),
                        payment_method VARCHAR(255),
                        notes VARCHAR(255),
                        wedding_date VARCHAR(255) NOT NULL,
                        transaction_time VARCHAR(255) NOT NULL,
                        expired_va VARCHAR(255),
                        created_at BIGINT ,
                        updated_at BIGINT ,
                        deleted_at BIGINT,
                        FOREIGN KEY (user_id) REFERENCES users(id),
                        FOREIGN KEY (product_id) REFERENCES product(id)
);