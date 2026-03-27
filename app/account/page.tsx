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
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>Account</h1>
        <p className="small">Signed in as {user.email}</p>
      </section>

      <section className="grid cols-3">
        <div className="card">
          <h3>Private history</h3>
          <p className="small">View sessions attached to your account.</p>
          <div className="buttonRow">
            <a className="btn" href="/history">Open History</a>
          </div>
        </div>

        <div className="card">
          <h3>Tutor Support for Students</h3>
          <p className="small">Ask questions directly and save them to your account.</p>
          <div className="buttonRow">
            <a className="btn secondary" href="/tutor">Open Tutor</a>
          </div>
        </div>

        <div className="card">
          <h3>Account access</h3>
          <p className="small">Sign out when you are done.</p>
          <div className="buttonRow">
            <SignOutButton />
          </div>
        </div>
      </section>
    </div>
  );
}