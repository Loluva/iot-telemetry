CREATE TABLE devices(
    id SERIAL PRIMARY KEY,
    serial VARCHAR(24) NOT NULL UNIQUE,
    user_id INT,
    battery DOUBLE PRECISION,
    last_connection TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()

);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at=NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER device_update BEFORE UPDATE ON devices FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TABLE readings(
    id SERIAL PRIMARY KEY,
    device_id INT NOT NULL,
    variable VARCHAR(100) NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    measured_at TIMESTAMPTZ NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_device
        FOREIGN KEY (device_id)
        REFERENCES devices(id)
        ON DELETE RESTRICT   
);
   