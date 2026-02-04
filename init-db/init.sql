-- OneChemic Database Initialization Script
-- This script runs when the PostgreSQL container starts for the first time

-- Create the database if it doesn't exist (handled by POSTGRES_DB env var)
-- The application will handle migrations via EF Core

-- Create extension for UUID if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Note: The actual tables will be created by Entity Framework Core migrations
-- when the backend application starts. This script ensures the database is ready
-- and can include any additional setup needed.

-- Grant all privileges to the postgres user on the database
GRANT ALL PRIVILEGES ON DATABASE one_chemic TO postgres;
