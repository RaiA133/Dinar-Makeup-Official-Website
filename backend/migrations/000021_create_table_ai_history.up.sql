CREATE TABLE ai_history (
                            id SERIAL PRIMARY KEY,
                            user_id INTEGER NOT NULL,
                            sender VARCHAR(10) CHECK (sender IN ('user', 'bot')) NOT NULL,
                            message TEXT NOT NULL,
                            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);