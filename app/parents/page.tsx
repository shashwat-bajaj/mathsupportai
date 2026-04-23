import { createAdminSupabase } from '@/lib/supabase-admin';
import { createClient as createAuthClient } from '@/lib/supabase/server';
import MathTutor from '@/components/MathTutor';
import ConversationThread from '@/components/ConversationThread';
import DeleteConversationButton from '@/components/DeleteConversationButton';

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
  turn_index: number | null;
  mode: string;
  level: string;
  prompt: string;
  response: string;
  created_at: string;
};

function makePreview(text: string, max = 88) {
  if (!text) return '';
  const cleaned = text.replace(/\s+/g, ' ').trim();
  return cleaned.length > max ? `${cleaned.slice(0, max)}...` : cleaned;
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default async function ParentsPage({
  searchParams
}: {
  searchParams: Promise<{ conversation?: string }>;
}) {
  const params = await searchParams;
  const selectedConversationId = (params.conversation || '').trim();

  const authClient = await createAuthClient();
  const {
    data: { user }
  } = await authClient.auth.getUser();

  const supabase = createAdminSupabase();

  let conversations: ConversationRecord[] = [];
  let turns: TurnRecord[] = [];
  const firstPromptByConversation: Record<string, string> = {};

  if (user?.id) {
    const { data } = await supabase
      .from('learner_conversations')
      .select('id, title, audience, created_at, updated_at')
      .eq('user_id', user.id)
      .eq('audience', 'parent')
      .order('updated_at', { ascending: false })
      .limit(30);

    conversations = (data || []) as ConversationRecord[];

    if (conversations.length > 0) {
      const conversationIds = conversations.map((conversation) => conversation.id);

      const { data: firstTurns } = await supabase
        .from('learner_sessions')
        .select('conversation_id, prompt, turn_index, created_at')
        .in('conversation_id', conversationIds)
        .eq('turn_index', 1)
        .order('created_at', { ascending: true });

      for (const turn of (firstTurns || []) as TurnPreviewRecord[]) {
        if (!firstPromptByConversation[turn.conversation_id]) {
          firstPromptByConversation[turn.conversation_id] = turn.prompt || '';
        }
      }
    }
  }

  const selectedConversation = selectedConversationId
    ? conversations.find((conversation) => conversation.id === selectedConversationId) || null
    : null;

  if (selectedConversation) {
    const { data } = await supabase
      .from('learner_sessions')
      .select('id, turn_index, mode, level, prompt, response, created_at')
      .eq('conversation_id', selectedConversation.id)
      .order('turn_index', { ascending: true })
      .order('created_at', { ascending: true });

    turns = (data || []) as TurnRecord[];
  }

  if (!user) {
    return (
      <div className="grid" style={{ gap: 30 }}>
        <section
          style={{
            display: 'grid',
            gap: 14,
            maxWidth: 860,
            paddingTop: 6
          }}
        >
          <span className="badge">Parent workspace</span>
          <h1 style={{ margin: 0 }}>
            Guidance for helping a child learn, without jumping straight to the final answer.
          </h1>
          <p className="small" style={{ margin: 0, maxWidth: 760 }}>
            Use this workspace when you want parent-friendly explanation, simple examples,
            talking points, likely-mistake guidance, and practice prompts that help a child
            understand the concept more clearly.
          </p>
        </section>

        <MathTutor
          audience="parent"
          lockedMode="hint"
          title="Tutor Support for Parents"
          description="Use this version when you want guidance on how to help a child learn without jumping straight to the full solution."
          placeholder="Example: My child is learning long division and gets confused after the first subtraction step. How can I explain it clearly?"
        />
      </div>
    );
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
          <span className="badge">Parent workspace</span>
          <h1 style={{ margin: 0 }}>
            A calmer support surface for adults helping a child learn math more clearly.
          </h1>
          <p className="small" style={{ margin: 0, maxWidth: 820 }}>
            Ask for simpler explanations, talking points, examples, likely-mistake guidance, and
            practice prompts without forcing the interaction into a full worked solution. Signed in
            as <strong>{user.email}</strong>.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 18,
            paddingTop: 14,
            borderTop: '1px solid var(--border)'
          }}
        >
          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Saved sessions</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              {conversations.length} available in your parent history.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Default flow</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Guided hint mode with child-level explanation and parent-friendly support.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Best for</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Explaining concepts aloud, giving examples, spotting confusion, and supporting practice.
            </p>
          </div>
        </div>
      </section>

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
            <h2 style={{ margin: 0 }}>Parent Sessions</h2>
            <p className="small" style={{ margin: 0 }}>
              Open an earlier parent thread or start a new one.
            </p>

            <div className="buttonRow" style={{ marginTop: 4 }}>
              <a className="btn secondary" href="/parents">
                New Session
              </a>
            </div>
          </div>

          {conversations.length === 0 ? (
            <div
              style={{
                display: 'grid',
                gap: 6,
                padding: '2px 0'
              }}
            >
              <p className="small" style={{ margin: 0 }}>
                No saved parent sessions yet.
              </p>
            </div>
          ) : (
            <div className="sessionList">
              {conversations.map((conversation) => {
                const isActive = selectedConversation?.id === conversation.id;
                const firstPrompt =
                  firstPromptByConversation[conversation.id] ||
                  conversation.title ||
                  'Untitled conversation';

                return (
                  <div
                    key={conversation.id}
                    className={`sessionItem ${isActive ? 'active' : ''}`}
                    style={{ display: 'grid', gap: 8 }}
                  >
                    <a href={`/parents?conversation=${conversation.id}`} style={{ display: 'block' }}>
                      <p className="small" style={{ margin: '0 0 6px' }}>
                        <strong>{makePreview(firstPrompt)}</strong>
                      </p>
                      <p className="small" style={{ margin: 0 }}>
                        Updated {formatDate(conversation.updated_at)}
                      </p>
                    </a>

                    <div className="buttonRow">
                      <DeleteConversationButton
                        conversationId={conversation.id}
                        redirectHref="/parents"
                        compact
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        <main style={{ display: 'grid', gap: 20, minWidth: 0 }}>
          <MathTutor
            audience="parent"
            lockedMode="hint"
            initialConversationId={selectedConversation?.id || null}
            newSessionHref="/parents"
            title="Tutor Support for Parents"
            description="Use this version when you want parent-friendly guidance, simpler explanation, talking points, examples, and practice prompts without jumping straight to the full solution."
            placeholder="Example: My child is learning long division and gets confused after the first subtraction step. How can I explain it clearly?"
          />

          {selectedConversation && turns.length > 0 ? (
            <section style={{ display: 'grid', gap: 16 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 14,
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  paddingTop: 6,
                  borderTop: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'grid', gap: 4 }}>
                  <h2 style={{ margin: 0 }}>Current Session Thread</h2>
                  <p className="small" style={{ margin: 0 }}>
                    View the full question-and-answer flow for this parent session.
                  </p>
                </div>

                <DeleteConversationButton
                  conversationId={selectedConversation.id}
                  redirectHref="/parents"
                />
              </div>

              <ConversationThread
                title={selectedConversation.title}
                audience={selectedConversation.audience}
                createdAt={selectedConversation.created_at}
                updatedAt={selectedConversation.updated_at}
                turns={turns}
                showDeleteTurnControls
                redirectHref={`/parents?conversation=${selectedConversation.id}`}
              />
            </section>
          ) : null}
        </main>
      </section>
    </div>
  );
}