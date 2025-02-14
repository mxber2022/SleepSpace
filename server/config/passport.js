import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client with service role key
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

// WHOOP OAuth configuration
const whoopOAuthConfig = {
  authorizationURL: 'https://api.prod.whoop.com/oauth/oauth2/auth',
  tokenURL: 'https://api.prod.whoop.com/oauth/oauth2/token',
  clientID: process.env.WHOOP_CLIENT_ID,
  clientSecret: process.env.WHOOP_CLIENT_SECRET,
  callbackURL: process.env.WHOOP_CALLBACK_URL,
  scope: ['offline', 'read:profile'],
  state: true
};

// Fetch user profile from WHOOP
const fetchProfile = async (accessToken, done) => {
  try {
    console.log('Fetching WHOOP profile with token:', accessToken);
    const profileResponse = await fetch(
      'https://api.prod.whoop.com/developer/v1/user/profile/basic',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        },
      }
    );

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.error('WHOOP API Error:', errorText);
      throw new Error(`Failed to fetch profile: ${profileResponse.statusText}`);
    }

    const profile = await profileResponse.json();
    console.log('Fetched WHOOP profile:', profile);
    done(null, profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    done(error);
  }
};

// Handle user data after successful authentication
const getUser = async (accessToken, refreshToken, { expires_in }, profile, done) => {
  try {
    console.log('Processing WHOOP user data:', profile);
    const { first_name, last_name, user_id } = profile;

    // First, try to find existing user
    let { data: existingUser, error: findError } = await supabase
      .from('users')
      .select()
      .eq('whoop_user_id', user_id)
      .single();

    if (findError && findError.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error finding user:', findError);
      throw findError;
    }

    let userData;
    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('users')
        .update({
          first_name,
          last_name,
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('whoop_user_id', user_id)
        .select()
        .single();

      if (error) {
        console.error('Error updating user:', error);
        throw error;
      }
      
      userData = data;
      console.log('Updated existing user:', userData);
    } else {
      // Create new user
      const { data, error } = await supabase
        .from('users')
        .insert({
          whoop_user_id: user_id,
          first_name,
          last_name,
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_at: new Date(Date.now() + expires_in * 1000).toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user:', error);
        throw error;
      }
      
      userData = data;
      console.log('Created new user:', userData);
    }

    done(null, userData);
  } catch (error) {
    console.error('Error saving user:', error);
    done(error);
  }
};

// Configure Passport OAuth2 strategy
const whoopAuthorizationStrategy = new OAuth2Strategy(whoopOAuthConfig, getUser);
whoopAuthorizationStrategy.userProfile = fetchProfile;
passport.use('whoop', whoopAuthorizationStrategy);

// Serialize user for the session
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    console.log('Deserializing user ID:', id);
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error deserializing user:', error);
      throw error;
    }

    if (!data) {
      console.error('No user found with ID:', id);
      return done(null, false);
    }

    console.log('Deserialized user:', data);
    done(null, data);
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error);
  }
});

export default passport;