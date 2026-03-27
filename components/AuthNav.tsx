import { createClient } from '@/lib/supabase/server';

export default async function AuthNav() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    return <a href="/account">Account</a>;
  }

  return <a href="/login">Login</a>;
}