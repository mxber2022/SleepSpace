/*
  # Add insert policy for users table

  1. Changes
    - Add policy to allow inserting new users during OAuth flow
    - Add policy to allow the service role to manage users

  2. Security
    - Maintains existing RLS policies
    - Adds new policy for user creation
*/

-- Allow service role to bypass RLS
ALTER TABLE users FORCE ROW LEVEL SECURITY;

-- Add policy for inserting new users
CREATE POLICY "Allow service role to manage users"
ON users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Add policy for authenticated users to insert their own data
CREATE POLICY "Users can insert own data"
ON users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);