import { createAdminSupabase } from '@/lib/supabase-admin';
import { createClient as createAuthClient } from '@/lib/supabase/server';
import DeleteConversationButton from '@/components/DeleteConversationButton';
import ConversationThread from '@/components/ConversationThread';
import Reveal from '@/components/Reveal';
import { getSubjectConfig, type SubjectKey } from '@/lib/subjects';

type ConversationRecord = {
  id: string;
  title: string | null;
  audience: string;
  subject: string;
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
  subject?: SubjectKey;
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

function getHistoryLabel(subject?: SubjectKey) {
  if (!subject) return 'History';

  const subjectConfig = getSubjectConfig(subject);
  return subjectConfig ? `${subjectConfig.name} History` : 'History';
}

function getEmptyMessage(subject?: SubjectKey) {
  if (!subject) {
    return 'No saved conversations were found for this history view.';
  }

  const subjectConfig = getSubjectConfig(subject);
  const subjectName = subjectConfig?.name.toLowerCase() || subject;

  return `No saved ${subjectName} conversations were found for this history view.`;
}

export default async function HistoryPageContent({
  searchParams,
  historyHref = '/history',
  subject
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

    let query = supabase
      .from('learner_conversations')
      .select('id, title, audience, subject, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(30);

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data, error } = await query;

    if (error) {
      errorMessage = error.message;
    } else {
      conversations = (data || []) as ConversationRecord[];
    }
  } else if (fallbackEmail) {
    historyMode = 'email';

    let query = supabase
      .from('learner_conversations')
      .select('id, title, audience, subject, created_at, updated_at')
      .eq('email', fallbackEmail)
      .order('updated_at', { ascending: false })
      .limit(30);

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data, error } = await query;

    if (error) {
      errorMessage = error.message;
    } else {
      conversations = (data || []) as ConversationRecord[];
    }
  }

  if (!errorMessage && conversations.length > 0) {
    const conversationIds = conversations.map((conversation) => conversation.id);

    let query = supabase
      .from('learner_sessions')
      .select('conversation_id, prompt, turn_index, created_at')
      .in('conversation_id', conversationIds)
      .eq('turn_index', 1)
      .order('created_at', { ascending: true });

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data: firstTurns, error: firstTurnsError } = await query;

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
    let query = supabase
      .from('learner_sessions')
      .select('id, conversation_id, turn_index, mode, level, prompt, response, created_at')
      .eq('conversation_id', selectedConversation.id)
      .order('turn_index', { ascending: true })
      .order('created_at', { ascending: true });

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data, error } = await query;

    if (error) {
      errorMessage = error.message;
    } else {
      turns = (data || []) as TurnRecord[];
    }
  }

  const graphingEnabledForSelectedConversation = selectedConversation
    ? Boolean(getSubjectConfig(selectedConversation.subject)?.features.graphing)
    : false;

  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">{getHistoryLabel(subject)}</span>

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
        <Reveal delay={0.04}>
          <section className="card" style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <h2 style={{ margin: 0 }}>Load older beta history</h2>
              <p className="small" style={{ margin: 0 }}>
                Use the email lookup only for earlier beta conversations that were not attached to an
                account yet.
              </p>
            </div>

            <form
              method="GET"
              className="historyLookupForm"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 420px) auto',
                gap: 12,
                alignItems: 'end',
                justifyContent: 'start',
                maxWidth: 820
              }}
            >
              <div style={{ minWidth: 0 }}>
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={fallbackEmail}
                  placeholder="you@example.com"
                  style={{ width: '100%' }}
                />
              </div>

              <div
                className="buttonRow"
                style={{
                  flexWrap: 'nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <button type="submit" style={{ whiteSpace: 'nowrap' }}>
                  Load legacy email history
                </button>
                <a className="btn secondary" href="/login" style={{ whiteSpace: 'nowrap' }}>
                  Log in instead
                </a>
              </div>
            </form>
          </section>
        </Reveal>
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
            {getEmptyMessage(subject)}
          </p>
        </section>
      ) : (
        <div className="historyLayoutWrap">
          <section
            className="historyLayout"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 340px) minmax(0, 1fr)',
              gap: 26,
              alignItems: 'start',
              width: '100%'
            }}
          >
            <aside
              className="card"
              style={{
                display: 'grid',
                gap: 14,
                width: '100%',
                minWidth: 0,
                alignSelf: 'start'
              }}
            >
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
                          {conversation.subject} • {conversation.audience} • Updated{' '}
                          {formatDate(conversation.updated_at)}
                        </p>
                      </a>

                      {historyMode === 'account' ? (
                        <div className="buttonRow" style={{ justifyContent: 'flex-start' }}>
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
            </aside>

            <main
              className="card"
              style={{
                display: 'grid',
                gap: 14,
                width: '100%',
                minWidth: 0,
                alignSelf: 'start'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) auto',
                  gap: 14,
                  alignItems: 'start'
                }}
              >
                <div style={{ display: 'grid', gap: 4 }}>
                  <h2 style={{ margin: 0 }}>Conversation thread</h2>
                  <p className="small" style={{ margin: 0 }}>
                    View the full question-and-answer flow for the selected session.
                  </p>
                </div>

                {historyMode === 'account' && selectedConversation ? (
                  <div style={{ justifySelf: 'end' }}>
                    <DeleteConversationButton
                      conversationId={selectedConversation.id}
                      redirectHref={historyHref}
                    />
                  </div>
                ) : null}
              </div>

              {selectedConversation ? (
                turns.length > 0 ? (
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
                    graphingEnabled={graphingEnabledForSelectedConversation}
                  />
                ) : (
                  <p className="small" style={{ margin: 0 }}>
                    This conversation was found, but no saved turns were loaded.
                  </p>
                )
              ) : (
                <p className="small" style={{ margin: 0 }}>
                  Select a conversation to view it.
                </p>
              )}
            </main>
          </section>
        </div>
      )}

      <style>
        {`
          .historyLayoutWrap {
            width: 100%;
          }

          .historyLayout {
            width: 100%;
          }

          @media (max-width: 760px) {
            .historyLayout {
              grid-template-columns: 1fr !important;
            }

            .historyLookupForm {
              grid-template-columns: 1fr !important;
              max-width: 100% !important;
            }

            .historyLookupForm .buttonRow {
              flex-wrap: wrap !important;
            }
          }
        `}
      </style>
    </div>
  );
}