import { createAdminSupabase } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

async function getTutorSessions() {
  const supabase = createAdminSupabase();

  return supabase
    .from('learner_sessions')
    .select('id, email, mode, level, prompt, response, created_at')
    .order('created_at', { ascending: false })
    .limit(10);
}

async function getBetaSignups() {
  const supabase = createAdminSupabase();

  return supabase
    .from('beta_signups')
    .select('id, name, email, goal, created_at')
    .order('created_at', { ascending: false })
    .limit(10);
}

async function getContactMessages() {
  const supabase = createAdminSupabase();

  return supabase
    .from('contact_messages')
    .select('id, name, email, message, created_at')
    .order('created_at', { ascending: false })
    .limit(10);
}

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ password?: string }>;
}) {
  const params = await searchParams;
  const password = params.password || '';
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD || '';

  if (!expected || password !== expected) {
    return (
      <div className="grid" style={{ gap: 24 }}>
        <section className="card">
          <h1>Admin dashboard</h1>
          <p className="small">
            This page is restricted.
          </p>

          <form method="GET" className="grid" style={{ gap: 12 }}>
            <div>
              <label>Admin password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter admin password"
              />
            </div>

            <div className="buttonRow">
              <button type="submit">Open dashboard</button>
            </div>
          </form>
        </section>
      </div>
    );
  }

  const [
    { data: sessions, error: sessionsError },
    { data: signups, error: signupsError },
    { data: messages, error: messagesError }
  ] = await Promise.all([
    getTutorSessions(),
    getBetaSignups(),
    getContactMessages()
  ]);

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>Admin dashboard</h1>
        <p className="small">
          Internal beta overview for tutor activity, signups, and contact messages.
        </p>
      </section>

      <section className="card">
        <h2>Recent beta signups</h2>
        {signupsError ? (
          <p className="small">Error loading beta signups: {signupsError.message}</p>
        ) : !signups || signups.length === 0 ? (
          <p className="small">No beta signups yet.</p>
        ) : (
          <div className="grid" style={{ gap: 16 }}>
            {signups.map((signup) => (
              <div key={signup.id} className="card">
                <p className="small">
                  <strong>Name:</strong> {signup.name || 'Not provided'}
                </p>
                <p className="small">
                  <strong>Email:</strong> {signup.email}
                </p>
                <p className="small">
                  <strong>Joined:</strong> {new Date(signup.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Goal:</strong><br />
                  {signup.goal || 'No goal provided'}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h2>Recent contact messages</h2>
        {messagesError ? (
          <p className="small">Error loading contact messages: {messagesError.message}</p>
        ) : !messages || messages.length === 0 ? (
          <p className="small">No contact messages yet.</p>
        ) : (
          <div className="grid" style={{ gap: 16 }}>
            {messages.map((message) => (
              <div key={message.id} className="card">
                <p className="small">
                  <strong>Name:</strong> {message.name || 'Not provided'}
                </p>
                <p className="small">
                  <strong>Email:</strong> {message.email}
                </p>
                <p className="small">
                  <strong>Sent:</strong> {new Date(message.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Message:</strong><br />
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h2>Recent tutor sessions</h2>
        {sessionsError ? (
          <p className="small">Error loading tutor sessions: {sessionsError.message}</p>
        ) : !sessions || sessions.length === 0 ? (
          <p className="small">No tutor sessions yet.</p>
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