import { createClient } from '@/lib/supabase/server';

export default async function AuthNav() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <a href="/account" aria-label="Open your account">
        Account
      </a>
    );
  }

  return (
    <a href="/login" aria-label="Log in to your account">
      Log in
    </a>
  );
}