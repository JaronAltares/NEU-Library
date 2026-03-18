// auth.js – pure ESM version (no global Supabase)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

supabase.auth.onAuthStateChange((event, session) => {
  console.log('[AUTH] Event:', event);
  if (event === 'SIGNED_OUT') {
    window.location.href = './index.html';
  }
});

export async function signInWithGoogle() {
  console.log('[AUTH] Google sign-in started');
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/checkin.html'
      }
    });
    if (error) throw error;
  } catch (err) {
    console.error('[AUTH] Google sign-in error:', err);
    alert('Sign-in failed: ' + (err.message || 'unknown error'));
  }
}

export async function logout() {
  console.log('[AUTH] Logging out');
  await supabase.auth.signOut();
}

export { supabase };