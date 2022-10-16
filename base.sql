CREATE EXTENSION "uuid-ossp";

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE "users"(
    "id" VARCHAR(255) DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
)

ALTER TABLE "users" ADD PRIMARY KEY ("id");

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
