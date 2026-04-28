CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,    
    role VARCHAR(10) NOT NULL DEFAULT 'user' CHECK (role IN ('admin','user')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER user_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW 
    EXECUTE FUNCTION update_timestamp();

INSERT INTO migrations (name) VALUES ('001_add_user');