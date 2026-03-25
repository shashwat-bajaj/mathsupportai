import { createAdminSupabase } from '@/lib/supabase-admin';
import RenderedContent from '@/components/RenderedContent';

export const dynamic = 'force-dynamic';

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function makePreview(text: string, max = 110) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

export default async function HistoryPage({
  searchParams
}: {
  searchParams: Promise<{ email?: string; id?: string }>;
}) {
  const params = await searchParams;
  const email = (params.email || '').trim().toLowerCase();
  const selectedId = (params.id || '').trim();

  let sessions: any[] = [];
  let errorMessage = '';

  if (email) {
    const supabase = createAdminSupabase();

    const { data, error } = await supabase
      .from('learner_sessions')
      .select('id, email, mode, level, prompt, response, created_at')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) {
      errorMessage = error.message;
    } else {
      sessions = data || [];
    }
  }

  const selectedSession =
    sessions.find((session) => session.id === selectedId) || sessions[0] || null;

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>Session history</h1>
        <p className="small">
          Enter the same email you used in the tutor to view your saved beta sessions.
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
        <section className="twoPane">
          <div className="card">
            <h2>Saved sessions</h2>
            <div className="sessionList">
              {sessions.map((session) => {
                const isActive = selectedSession?.id === session.id;
                return (
                  <a
                    key={session.id}
                    href={`/history?email=${encodeURIComponent(email)}&id=${session.id}`}
                    className={`sessionItem ${isActive ? 'active' : ''}`}
                  >
                    <p className="small">
                      <strong>{formatDate(session.created_at)}</strong>
                    </p>
                    <p className="small">
                      {session.mode} • {session.level}
                    </p>
                    <p>{makePreview(session.prompt)}</p>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="card">
            <h2>Selected session</h2>
            {selectedSession ? (
              <div className="grid" style={{ gap: 18 }}>
                <div>
                  <p className="small">
                    <strong>Asked:</strong> {formatDate(selectedSession.created_at)}
                  </p>
                  <p className="small">
                    <strong>Mode:</strong> {selectedSession.mode} | <strong>Level:</strong>{' '}
                    {selectedSession.level}
                  </p>
                </div>

                <div>
                  <h3>Question</h3>
                  <div className="card questionSurface">
                    <div className="question-block">{selectedSession.prompt}</div>
                  </div>
                </div>

                <div>
                  <h3>Answer</h3>
                  <div className="card answerSurface">
                    <RenderedContent content={selectedSession.response} />
                  </div>
                </div>
              </div>
            ) : (
              <p className="small">Select a session to view it.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}