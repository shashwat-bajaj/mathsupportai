import { createAdminSupabase } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export default async function HistoryPage({
  searchParams
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = (params.email || '').trim().toLowerCase();

  let sessions: any[] = [];
  let errorMessage = '';

  if (email) {
    const supabase = createAdminSupabase();

    const { data, error } = await supabase
      .from('learner_sessions')
      .select('id, email, mode, level, prompt, response, created_at')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      errorMessage = error.message;
    } else {
      sessions = data || [];
    }
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>Session history</h1>
        <p className="small">
          Enter the same email you used in the tutor to see your saved sessions.
        </p>

        <form method="GET" className="grid" style={{ gap: 12 }}>
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              defaultValue={email}
              placeholder="you@example.com"
            />
          </div>
          <div className="buttonRow">
            <button type="submit">Load history</button>
          </div>
        </form>
      </section>

      {!email ? (
        <section className="card">
          <p className="small">Enter an email above to load saved tutor sessions.</p>
        </section>
      ) : errorMessage ? (
        <section className="card">
          <p className="small">Error loading history: {errorMessage}</p>
        </section>
      ) : sessions.length === 0 ? (
        <section className="card">
          <p className="small">No saved sessions were found for {email}.</p>
        </section>
      ) : (
        <section className="grid" style={{ gap: 16 }}>
          {sessions.map((session) => (
            <div key={session.id} className="card">
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
        </section>
      )}
    </div>
  );
}