-- Supabase Database Schema for Customers and Pets

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pets table
CREATE TABLE IF NOT EXISTS pets (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for efficient pet queries by customer
CREATE INDEX IF NOT EXISTS idx_pets_customer_id ON pets(customer_id);

-- Index for email lookups (optional, for future use)
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

