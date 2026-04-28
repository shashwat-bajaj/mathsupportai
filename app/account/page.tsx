import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SignOutButton from '@/components/SignOutButton';
import ActionCard from '@/components/ActionCard';
import Reveal from '@/components/Reveal';

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
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">Account</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Your account and saved workspace.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              Signed in as <strong>{user.email}</strong>. Your account keeps session history,
              preferences, and tutor defaults connected across visits so the product feels more
              continuous over time.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="grid cols-3">
          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>History</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Revisit saved conversations, continue older threads, and keep track of earlier work
              across active TutoVera subject branches.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Preferences</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Control theme, translation language, learner level, and default tutor behavior from one
              account-wide place.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Account access</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Stay signed in while working through sessions, or sign out whenever you are done.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.14}>
        <section className="grid cols-3">
          <ActionCard
            title="Account history"
            description="View sessions attached to your account and continue older tutor threads more naturally."
            action={
              <a className="btn secondary" href="/history">
                Open History
              </a>
            }
          />

          <ActionCard
            title="Settings"
            description="Choose your defaults for theme, translation, learner level, and tutor behavior."
            action={
              <a className="btn secondary" href="/settings">
                Open Settings
              </a>
            }
          />

          <ActionCard
            title="Account access"
            description="Sign out when you are done using the product on this device."
            action={<SignOutButton />}
          />
        </section>
      </Reveal>
    </div>
  );
}