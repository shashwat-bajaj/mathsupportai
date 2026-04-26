import { createAdminSupabase } from '@/lib/supabase-admin';
import { createClient as createAuthClient } from '@/lib/supabase/server';
import DeleteConversationButton from '@/components/DeleteConversationButton';
import ConversationThread from '@/components/ConversationThread';
import Reveal from '@/components/Reveal';

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

type HistoryPageContentProps = {
  searchParams: Promise<{ email?: string; conversation?: string }>;
  historyHref?: string;
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

function buildHistoryHref({
  historyHref,
  historyMode,
  fallbackEmail,
  conversationId
}: {
  historyHref: string;
  historyMode: 'account' | 'email' | 'none';
  fallbackEmail: string;
  conversationId: string;
}) {
  if (historyMode === 'account') {
    return `${historyHref}?conversation=${conversationId}`;
  }

  return `${historyHref}?email=${encodeURIComponent(fallbackEmail)}&conversation=${conversationId}`;
}

export default async function HistoryPageContent({
  searchParams,
  historyHref = '/history'
}: HistoryPageContentProps) {
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
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">History</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Revisit earlier sessions without losing the thread.</h1>
            {user ? (
              <p className="small" style={{ margin: 0, maxWidth: 820 }}>
                Signed in as <strong>{user.email}</strong>. These are your private account-linked
                conversations, saved so you can return to earlier work and continue naturally.
              </p>
            ) : (
              <p className="small" style={{ margin: 0, maxWidth: 820 }}>
                You are not signed in yet. You can still use the legacy beta email lookup below, but
                account-linked history is now the preferred way to keep sessions private and easier to
                manage.
              </p>
            )}
          </div>
        </section>
      </Reveal>

      {!user ? (
        <Reveal delay={0.06}>
          <section className="card" style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <h2 style={{ margin: 0 }}>Load older beta history</h2>
              <p className="small" style={{ margin: 0 }}>
                Use the email lookup only for earlier beta conversations that were not attached to an
                account yet.
              </p>
            </div>

            <form method="GET" className="grid" style={{ gap: 12 }}>
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
          </section>
        </Reveal>
      ) : null}

      {historyMode === 'none' ? (
        <Reveal delay={0.1}>
          <section className="card">
            <p className="small" style={{ margin: 0 }}>
              Sign in to view private history, or use the email lookup form for older beta
              conversations.
            </p>
          </section>
        </Reveal>
      ) : errorMessage ? (
        <Reveal delay={0.1}>
          <section className="card">
            <p className="small" style={{ margin: 0 }}>
              Error loading history: {errorMessage}
            </p>
          </section>
        </Reveal>
      ) : conversations.length === 0 ? (
        <Reveal delay={0.1}>
          <section className="card">
            <p className="small" style={{ margin: 0 }}>
              No saved conversations were found for this history view.
            </p>
          </section>
        </Reveal>
      ) : (
        <section className="twoPane">
          <Reveal delay={0.1}>
            <div className="card" style={{ display: 'grid', gap: 14 }}>
              <div style={{ display: 'grid', gap: 6 }}>
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

                  const href = buildHistoryHref({
                    historyHref,
                    historyMode,
                    fallbackEmail,
                    conversationId: conversation.id
                  });

                  return (
                    <div
                      key={conversation.id}
                      className={`sessionItem ${isActive ? 'active' : ''}`}
                      style={{ display: 'grid', gap: 8 }}
                    >
                      <a href={href}>
                        <p className="small" style={{ margin: '0 0 6px' }}>
                          <strong>{makePreview(firstPrompt)}</strong>
                        </p>
                        <p className="small" style={{ margin: 0 }}>
                          {conversation.audience} • Updated {formatDate(conversation.updated_at)}
                        </p>
                      </a>

                      {historyMode === 'account' ? (
                        <div className="buttonRow">
                          <DeleteConversationButton
                            conversationId={conversation.id}
                            redirectHref={historyHref}
                            compact
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="card" style={{ display: 'grid', gap: 14 }}>
              <div className="buttonRow" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'grid', gap: 4 }}>
                  <h2 style={{ margin: 0 }}>Conversation thread</h2>
                  <p className="small" style={{ margin: 0 }}>
                    View the full question-and-answer flow for the selected session.
                  </p>
                </div>

                {historyMode === 'account' && selectedConversation ? (
                  <DeleteConversationButton
                    conversationId={selectedConversation.id}
                    redirectHref={historyHref}
                  />
                ) : null}
              </div>

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
                      ? `${historyHref}?conversation=${selectedConversation.id}`
                      : undefined
                  }
                />
              ) : (
                <p className="small" style={{ margin: 0 }}>
                  Select a conversation to view it.
                </p>
              )}
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}