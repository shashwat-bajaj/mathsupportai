import { createAdminSupabase } from '@/lib/supabase-admin';
import { createClient as createAuthClient } from '@/lib/supabase/server';
import DeleteConversationButton from '@/components/DeleteConversationButton';
import ConversationThread from '@/components/ConversationThread';

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
                  <div
                    key={conversation.id}
                    className={`sessionItem ${isActive ? 'active' : ''}`}
                    style={{ display: 'grid', gap: 8 }}
                  >
                    <a href={href}>
                      <p className="small">
                        <strong>{conversation.title || 'Untitled conversation'}</strong>
                      </p>
                      <p className="small">
                        {conversation.audience} • Updated {formatDate(conversation.updated_at)}
                      </p>
                      <p>{makePreview(conversation.title || 'New conversation')}</p>
                    </a>

                    {historyMode === 'account' ? (
                      <div className="buttonRow">
                        <DeleteConversationButton
                          conversationId={conversation.id}
                          redirectHref="/history"
                          compact
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="buttonRow" style={{ justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0 }}>Conversation thread</h2>
              {historyMode === 'account' && selectedConversation ? (
                <DeleteConversationButton
                  conversationId={selectedConversation.id}
                  redirectHref="/history"
                />
              ) : null}
            </div>

            {selectedConversation ? (
              <div style={{ marginTop: 16 }}>
                <ConversationThread
                  title={selectedConversation.title}
                  audience={selectedConversation.audience}
                  createdAt={selectedConversation.created_at}
                  updatedAt={selectedConversation.updated_at}
                  turns={turns}
                  showDeleteTurnControls={historyMode === 'account'}
                  redirectHref={
                    historyMode === 'account'
                      ? `/history?conversation=${selectedConversation.id}`
                      : undefined
                  }
                />
              </div>
            ) : (
              <p className="small" style={{ marginTop: 16 }}>
                Select a conversation to view it.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}