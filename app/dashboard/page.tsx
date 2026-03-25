import { createAdminSupabase } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createAdminSupabase();

  const { data: sessions, error } = await supabase
    .from('learner_sessions')
    .select('id, email, mode, level, prompt, response, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>Developer dashboard</h1>
        <p className="small">
          This is a temporary local beta dashboard to confirm that tutor sessions are being saved.
        </p>
      </section>

      <section className="card">
        <h2>Recent saved sessions</h2>

        {error ? (
          <p className="small">Error loading sessions: {error.message}</p>
        ) : !sessions || sessions.length === 0 ? (
          <p className="small">No saved sessions yet. Ask the tutor a question first.</p>
        ) : (
          <div className="grid" style={{ gap: 16 }}>
            {sessions.map((session) => (
              <div key={session.id} className="card">
                <p className="small">
                  <strong>Email:</strong> {session.email || 'Not provided'}
                </p>
                <p className="small">
                  <strong>Mode:</strong> {session.mode} | <strong>Level:</strong> {session.level}
                </p>
                <p className="small">
                  <strong>Asked:</strong> {new Date(session.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Question:</strong><br />
                  {session.prompt}
                </p>
                <p>
                  <strong>Answer:</strong><br />
                  {session.response}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}