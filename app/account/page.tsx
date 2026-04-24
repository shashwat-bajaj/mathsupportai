import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SignOutButton from '@/components/SignOutButton';

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
    <div className="grid" style={{ gap: 30 }}>
      <section
        style={{
          display: 'grid',
          gap: 18,
          paddingTop: 6
        }}
      >
        <div style={{ display: 'grid', gap: 10, maxWidth: 900 }}>
          <span className="badge">Account</span>
          <h1 style={{ margin: 0 }}>Your account and saved workspace.</h1>
          <p className="small" style={{ margin: 0, maxWidth: 820 }}>
            Signed in as <strong>{user.email}</strong>. Your account keeps session history,
            preferences, and tutor defaults connected across visits so the product feels more
            continuous over time.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
            paddingTop: 14,
            borderTop: '1px solid var(--border)'
          }}
        >
          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>History</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Revisit saved conversations and continue older tutor threads naturally.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Preferences</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Control theme, translation language, learner level, and default tutor behavior.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Account access</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Stay signed in while working, or sign out whenever you are done.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 22
        }}
      >
        <div className="card" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">Private history</span>
          <h3 style={{ margin: 0 }}>Open saved sessions</h3>
          <p className="small" style={{ margin: 0 }}>
            View conversations attached to your account and continue earlier tutor threads more
            naturally.
          </p>
          <div className="buttonRow" style={{ marginTop: 4 }}>
            <a className="btn secondary" href="/history">
              Open History
            </a>
          </div>
        </div>

        <div className="card" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">Settings</span>
          <h3 style={{ margin: 0 }}>Adjust your defaults</h3>
          <p className="small" style={{ margin: 0 }}>
            Choose theme, translation, learner level, and default tutor behavior in one place.
          </p>
          <div className="buttonRow" style={{ marginTop: 4 }}>
            <a className="btn secondary" href="/settings">
              Open Settings
            </a>
          </div>
        </div>

        <div className="card" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">Account access</span>
          <h3 style={{ margin: 0 }}>Sign out</h3>
          <p className="small" style={{ margin: 0 }}>
            End your session on this device whenever you are done using the product.
          </p>
          <div className="buttonRow" style={{ marginTop: 4 }}>
            <SignOutButton />
          </div>
        </div>
      </section>
    </div>
  );
}