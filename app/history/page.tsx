import { createAdminSupabase } from '@/lib/supabase-admin';
import { createClient as createAuthClient } from '@/lib/supabase/server';
import DeleteConversationButton from '@/components/DeleteConversationButton';
import ConversationThread from '@/components/ConversationThread';

export const dynamic = 'force-dynamic';

type ConversationRecord = {
  id: string;
  title: string | null;
  audience: string;
  created_at: string;
  updated_at: string;
};

type TurnPreviewRecord = {
  conversation_id: string;
  prompt: string;
  turn_index: number | null;
  created_at: string;
};

type TurnRecord = {
  id: string;
  conversation_id: string;
  turn_index: number | null;
  mode: string;
  level: string;
  prompt: string;
  response: string;
  created_at: string;
};

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function makePreview(text: string, max = 110) {
  if (!text) return '';
  const cleaned = text.replace(/\s+/g, ' ').trim();
  return cleaned.length > max ? `${cleaned.slice(0, max)}...` : cleaned;
}

function audienceLabel(value: string) {
  if (!value) return 'Unknown';
  return value.charAt(0).toUpperCase() + value.slice(1);
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

  let conversations: ConversationRecord[] = [];
  let turns: TurnRecord[] = [];
  let errorMessage = '';
  let historyMode: 'account' | 'email' | 'none' = 'none';
  const firstPromptByConversation: Record<string, string> = {};

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
      conversations = (data || []) as ConversationRecord[];
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
      conversations = (data || []) as ConversationRecord[];
    }
  }

  if (!errorMessage && conversations.length > 0) {
    const conversationIds = conversations.map((conversation) => conversation.id);

    const { data: firstTurns, error: firstTurnsError } = await supabase
      .from('learner_sessions')
      .select('conversation_id, prompt, turn_index, created_at')
      .in('conversation_id', conversationIds)
      .eq('turn_index', 1)
      .order('created_at', { ascending: true });

    if (firstTurnsError) {
      errorMessage = firstTurnsError.message;
    } else {
      for (const turn of (firstTurns || []) as TurnPreviewRecord[]) {
        if (!firstPromptByConversation[turn.conversation_id]) {
          firstPromptByConversation[turn.conversation_id] = turn.prompt || '';
        }
      }
    }
  }

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedConversationId) ||
    conversations[0] ||
    null;

  if (selectedConversation && !errorMessage) {
    const { data, error } = await supabase
      .from('learner_sessions')
      .select('id, conversation_id, turn_index, mode, level, prompt, response, created_at')
      .eq('conversation_id', selectedConversation.id)
      .order('turn_index', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      errorMessage = error.message;
    } else {
      turns = (data || []) as TurnRecord[];
    }
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
          <span className="badge">History</span>
          <h1 style={{ margin: 0 }}>Revisit earlier sessions without losing the thread.</h1>
          {user ? (
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              Signed in as <strong>{user.email}</strong>. These are your private account-linked
              conversations, saved so you can return to earlier work and continue naturally.
            </p>
          ) : (
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              You are not signed in yet. You can still use the older beta email lookup below, but
              account-linked history is now the cleaner and more private way to manage sessions.
            </p>
          )}
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
              <strong>History mode</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              {historyMode === 'account'
                ? 'Account-linked history'
                : historyMode === 'email'
                  ? 'Legacy email lookup'
                  : 'No history loaded yet'}
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Saved conversations</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              {conversations.length} available in this view.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Best for</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Continuing earlier work, checking older answers, and reopening graph-linked threads.
            </p>
          </div>
        </div>
      </section>

      {!user ? (
        <section className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Load older beta history</h2>
            <p className="small" style={{ margin: 0, maxWidth: 760 }}>
              Use email lookup only for earlier beta conversations that were not attached to an
              account yet.
            </p>
          </div>

          <form
            method="GET"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) auto',
              gap: 14,
              alignItems: 'end'
            }}
          >
            <div>
              <label>Email</label>
              <input
                name="email"
                type="email"
                defaultValue={fallbackEmail}
                placeholder="you@example.com"
              />
            </div>

            <div className="buttonRow" style={{ justifyContent: 'flex-end' }}>
              <button type="submit">Load legacy email history</button>
              <a className="btn secondary" href="/login">
                Log in instead
              </a>
            </div>
          </form>
        </section>
      ) : null}

      {historyMode === 'none' ? (
        <section className="card">
          <p className="small" style={{ margin: 0 }}>
            Sign in to view private history, or use the email lookup form for older beta
            conversations.
          </p>
        </section>
      ) : errorMessage ? (
        <section className="card">
          <p className="small" style={{ margin: 0 }}>
            Error loading history: {errorMessage}
          </p>
        </section>
      ) : conversations.length === 0 ? (
        <section className="card">
          <p className="small" style={{ margin: 0 }}>
            No saved conversations were found for this history view.
          </p>
        </section>
      ) : (
        <section className="twoPane" style={{ alignItems: 'start' }}>
          <aside
            style={{
              position: 'sticky',
              top: 96,
              alignSelf: 'start',
              display: 'grid',
              gap: 16
            }}
          >
            <div
              style={{
                display: 'grid',
                gap: 8,
                paddingBottom: 14,
                borderBottom: '1px solid var(--border)'
              }}
            >
              <h2 style={{ margin: 0 }}>Saved conversations</h2>
              <p className="small" style={{ margin: 0 }}>
                {conversations.length} saved {conversations.length === 1 ? 'conversation' : 'conversations'}
                {historyMode === 'account' ? ' in your account.' : ' found from email lookup.'}
              </p>
            </div>

            <div className="sessionList">
              {conversations.map((conversation) => {
                const isActive = selectedConversation?.id === conversation.id;
                const firstPrompt =
                  firstPromptByConversation[conversation.id] ||
                  conversation.title ||
                  'Untitled conversation';

                const href =
                  historyMode === 'account'
                    ? `/history?conversation=${conversation.id}`
                    : `/history?email=${encodeURIComponent(
                        fallbackEmail
                      )}&conversation=${conversation.id}`;

                return (
                  <div key={conversation.id} className={`sessionItem ${isActive ? 'active' : ''}`}>
                    <a href={href} style={{ display: 'block' }}>
                      <p className="small" style={{ margin: '0 0 6px' }}>
                        <strong>{makePreview(firstPrompt)}</strong>
                      </p>
                      <p className="small" style={{ margin: 0 }}>
                        {audienceLabel(conversation.audience)} • Updated {formatDate(conversation.updated_at)}
                      </p>
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
          </aside>

          <main style={{ display: 'grid', gap: 20, minWidth: 0 }}>
            <section
              style={{
                display: 'grid',
                gap: 14,
                paddingBottom: 16,
                borderBottom: '1px solid var(--border)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 14,
                  alignItems: 'flex-start',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'grid', gap: 4 }}>
                  <h2 style={{ margin: 0 }}>Conversation thread</h2>
                  <p className="small" style={{ margin: 0 }}>
                    View the full question-and-answer flow for the selected session.
                  </p>
                </div>

                {historyMode === 'account' && selectedConversation ? (
                  <DeleteConversationButton
                    conversationId={selectedConversation.id}
                    redirectHref="/history"
                  />
                ) : null}
              </div>
            </section>

            {selectedConversation ? (
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
            ) : (
              <p className="small" style={{ margin: 0 }}>
                Select a conversation to view it.
              </p>
            )}
          </main>
        </section>
      )}
    </div>
  );
}