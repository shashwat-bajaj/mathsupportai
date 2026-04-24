import { createClient } from '@/lib/supabase/server';

export default async function AuthNav() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <a
        href="/account"
        aria-label="Open your account"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: 38,
          padding: '0 13px',
          borderRadius: 999,
          border: '1px solid var(--accent-border)',
          background: 'color-mix(in srgb, var(--accent-soft) 86%, transparent)',
          color: 'var(--text)'
        }}
      >
        Account
      </a>
    );
  }

  return (
    <a
      href="/login"
      aria-label="Log in to your account"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: 38,
        padding: '0 13px',
        borderRadius: 999,
        border: '1px solid var(--border)',
        background: 'color-mix(in srgb, var(--surface-soft) 84%, transparent)',
        color: 'var(--text)'
      }}
    >
      Log in
    </a>
  );
}