import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SignOutButton from '@/components/SignOutButton';
import ActionCard from '@/components/ActionCard';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>Account</h1>
        <p className="small">Signed in as {user.email}</p>
      </section>

      <section className="grid cols-3">
        <ActionCard
          title="Private history"
          description="View sessions attached to your account."
          action={
            <a className="btn secondary" href="/history">
              Open History
            </a>
          }
        />

        <ActionCard
          title="Settings"
          description="Choose your default preferences for theme, translation, and tutoring."
          action={
            <a className="btn secondary" href="/settings">
              Open Settings
            </a>
          }
        />

        <ActionCard
          title="Account access"
          description="Sign out when you are done."
          action={<SignOutButton />}
        />
      </section>
    </div>
  );
}