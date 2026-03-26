import { createAdminSupabase } from '@/lib/supabase-admin';
import { createClient as createAuthClient } from '@/lib/supabase/server';
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
  searchParams: Promise<{ email?: string; conversation?: string }>;
}) {
  const params = await searchParams;
  const fallbackEmail = (params.email || '').trim().toLowerCase();
  const selectedConversationId = (params.conversation || '').trim();

  const authClient = await createAuthClient();
  const {
    data: { user }
  } = await authClient.auth.getUser();

  const supabase = createAdminSupabase();

  let conversations: any[] = [];
  let turns: any[] = [];
  let errorMessage = '';
  let historyMode: 'account' | 'email' | 'none' = 'none';

  if (user?.id) {
    historyMode = 'account';

    const { data, error } = await supabase
      .from('learner_conversations')
      .select('id, title, audience, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(30);

    if (error) {
      errorMessage = error.message;
    } else {
      conversations = data || [];
    }
  } else if (fallbackEmail) {
    historyMode = 'email';

    const { data, error } = await supabase
      .from('learner_conversations')
      .select('id, title, audience, created_at, updated_at')
      .eq('email', fallbackEmail)
      .order('updated_at', { ascending: false })
      .limit(30);

    if (error) {
      errorMessage = error.message;
    } else {
      conversations = data || [];
    }
  }

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedConversationId) ||
    conversations[0] ||
    null;

  if (selectedConversation) {
    const { data, error } = await supabase
      .from('learner_sessions')
      .select(
        'id, conversation_id, turn_index, mode, level, prompt, response, created_at'
      )
      .eq('conversation_id', selectedConversation.id)
      .order('turn_index', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      errorMessage = error.message;
    } else {
      turns = data || [];
    }
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>History</h1>
        {user ? (
          <p className="small">
            Signed in as <strong>{user.email}</strong>. These are your private account-linked conversations.
          </p>
        ) : (
          <p className="small">
            You are not signed in yet. You can still use the legacy beta email lookup below, but accounts are now the preferred way to keep private history.
          </p>
        )}

        {!user && (
          <form method="GET" className="grid" style={{ gap: 12, marginTop: 12 }}>
            <div>
              <label>Email</label>
              <input
                name="email"
                type="email"
                defaultValue={fallbackEmail}
                placeholder="you@example.com"
              />
            </div>
            <div className="buttonRow">
              <button type="submit">Load legacy email history</button>
              <a className="btn secondary" href="/login">
                Log in instead
              </a>
            </div>
          </form>
        )}
      </section>

      {historyMode === 'none' ? (
        <section className="card">
          <p className="small">
            Sign in to view private history, or use the email lookup form for older beta conversations.
          </p>
        </section>
      ) : errorMessage ? (
        <section className="card">
          <p className="small">Error loading history: {errorMessage}</p>
        </section>
      ) : conversations.length === 0 ? (
        <section className="card">
          <p className="small">No saved conversations were found for this history view.</p>
        </section>
      ) : (
        <section className="twoPane">
          <div className="card">
            <h2>Saved conversations</h2>
            <div className="sessionList">
              {conversations.map((conversation) => {
                const isActive = selectedConversation?.id === conversation.id;
                const href =
                  historyMode === 'account'
                    ? `/history?conversation=${conversation.id}`
                    : `/history?email=${encodeURIComponent(fallbackEmail)}&conversation=${conversation.id}`;

                return (
                  <a
                    key={conversation.id}
                    href={href}
                    className={`sessionItem ${isActive ? 'active' : ''}`}
                  >
                    <p className="small">
                      <strong>{conversation.title || 'Untitled conversation'}</strong>
                    </p>
                    <p className="small">
                      {conversation.audience} • Updated {formatDate(conversation.updated_at)}
                    </p>
                    <p>{makePreview(conversation.title || 'New conversation')}</p>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="card">
            <h2>Conversation thread</h2>

            {selectedConversation ? (
              <div className="grid" style={{ gap: 18 }}>
                <div className="card threadHeader">
                  <p className="small">
                    <strong>Title:</strong> {selectedConversation.title || 'Untitled conversation'}
                  </p>
                  <p className="small">
                    <strong>Audience:</strong> {selectedConversation.audience}
                  </p>
                  <p className="small">
                    <strong>Started:</strong> {formatDate(selectedConversation.created_at)}
                  </p>
                  <p className="small">
                    <strong>Last updated:</strong> {formatDate(selectedConversation.updated_at)}
                  </p>
                </div>

                {turns.length === 0 ? (
                  <p className="small">No turns found for this conversation.</p>
                ) : (
                  <div className="threadTurns">
                    {turns.map((turn, index) => {
                      const label =
                        index === 0
                          ? 'Initial Question'
                          : `Follow-up ${index}`;

                      return (
                        <div key={turn.id} className="card turnCard">
                          <div className="turnLabelRow">
                            <span className="turnLabel">{label}</span>
                            <span className="small">
                              {turn.mode} • {turn.level} • {formatDate(turn.created_at)}
                            </span>
                          </div>

                          <div className="grid" style={{ gap: 12 }}>
                            <div>
                              <h3>Question</h3>
                              <div className="card questionSurface">
                                <div className="question-block">{turn.prompt}</div>
                              </div>
                            </div>

                            <div>
                              <h3>Answer</h3>
                              <div className="card answerSurface">
                                <RenderedContent content={turn.response} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <p className="small">Select a conversation to view it.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}