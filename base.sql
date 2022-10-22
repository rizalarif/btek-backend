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

CREATE TABLE "profile"(
  "id" VARCHAR(255) DEFAULT uuid_generate_v4(),
  "fullName" VARCHAR(255),
  "picture" VARCHAR(255),
  "birthDate" VARCHAR(255),
  "userId" VARCHAR(255), 
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ
);

ALTER TABLE "profile" ADD PRIMARY KEY ("id");

CREATE TABLE "forgotPassword"(
  "id" VARCHAR(255) DEFAULT uuid_generate_v4(),
  "code" VARCHAR(255),
  "email" VARCHAR(255),
  "userId" VARCHAR(255),
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ
);

ALTER TABLE "forgotPassword" ADD PRIMARY KEY ("id");

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "forgotPassword"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "profile"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
