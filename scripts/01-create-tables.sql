-- Create users table (Supabase auth handles this, but we can extend it)
-- Create legal_notices table to store generated notices
CREATE TABLE IF NOT EXISTS legal_notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  notice_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  scenario_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_legal_notices_user_id ON legal_notices(user_id);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_legal_notices_created_at ON legal_notices(created_at);

-- Enable Row Level Security
ALTER TABLE legal_notices ENABLE ROW LEVEL SECURITY;

-- Create policy so users can only see their own notices
CREATE POLICY "Users can view their own legal notices" ON legal_notices
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy so users can insert their own notices
CREATE POLICY "Users can insert their own legal notices" ON legal_notices
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy so users can update their own notices
CREATE POLICY "Users can update their own legal notices" ON legal_notices
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy so users can delete their own notices
CREATE POLICY "Users can delete their own legal notices" ON legal_notices
  FOR DELETE USING (auth.uid() = user_id);
