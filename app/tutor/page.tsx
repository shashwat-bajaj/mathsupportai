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

export default async function TutorPage({
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
      .eq('audience', 'student')
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
      <div className="grid" style={{ gap: 24 }}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">Student workspace</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Ask directly, follow up naturally, and keep the math flow going.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 840 }}>
              Use this workspace for direct math help, graphing, worked solutions, hints, mistake
              diagnosis, and practice questions. Signed-in users can also save sessions and revisit
              them later.
            </p>
          </div>
        </section>

        <MathTutor
          audience="student"
          title="Tutor Support for Students"
          description="Use this page for direct math help, worked solutions, hints, diagnosis mode, graphable questions, and practice questions."
        />
      </div>
    );
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card spotlightCard" style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'grid', gap: 10 }}>
          <span className="badge">Student workspace</span>
          <h1 style={{ margin: 0 }}>A tutor surface built for actual study flow, not one-off answers.</h1>
          <p className="small" style={{ margin: 0, maxWidth: 860 }}>
            Ask new questions, keep follow-ups inside the same thread, graph when needed, and
            revisit saved sessions without losing context. Signed in as <strong>{user.email}</strong>.
          </p>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12
          }}
        >
          <div className="card innerFeatureCard">
            <p className="small" style={{ margin: '0 0 4px' }}>
              <strong>Saved sessions</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              {conversations.length} available in your student history.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <p className="small" style={{ margin: '0 0 4px' }}>
              <strong>Default flow</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Auto mode, graph-aware follow-ups, and structured tutor continuity.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <p className="small" style={{ margin: '0 0 4px' }}>
              <strong>Best for</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Solving, graphing, revising, checking mistakes, and building on earlier work.
            </p>
          </div>
        </div>
      </section>

      <section className="twoPane">
        <aside
          className="card"
          style={{
            position: 'sticky',
            top: 94,
            alignSelf: 'start',
            display: 'grid',
            gap: 14
          }}
        >
          <div style={{ display: 'grid', gap: 6 }}>
            <h2 style={{ margin: 0 }}>Student Sessions</h2>
            <p className="small" style={{ margin: 0 }}>
              Open an earlier thread or start a new one.
            </p>
          </div>

          <div className="buttonRow">
            <a className="btn secondary" href="/tutor">
              New Session
            </a>
          </div>

          {conversations.length === 0 ? (
            <div className="card questionSurface" style={{ padding: 14 }}>
              <p className="small" style={{ margin: 0 }}>
                No saved student sessions yet.
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
                    <a href={`/tutor?conversation=${conversation.id}`} style={{ display: 'block' }}>
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
                        redirectHref="/tutor"
                        compact
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        <main style={{ display: 'grid', gap: 18, minWidth: 0 }}>
          <MathTutor
            audience="student"
            initialConversationId={selectedConversation?.id || null}
            newSessionHref="/tutor"
            title="Tutor Support for Students"
            description="Ask a new question or continue an earlier student session with follow-up questions, graph requests, and guided explanation."
          />

          {selectedConversation && turns.length > 0 ? (
            <section className="card" style={{ display: 'grid', gap: 16 }}>
              <div className="buttonRow" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'grid', gap: 4 }}>
                  <h2 style={{ margin: 0 }}>Current Session Thread</h2>
                  <p className="small" style={{ margin: 0 }}>
                    View the full question-and-answer flow for this student session.
                  </p>
                </div>

                <DeleteConversationButton
                  conversationId={selectedConversation.id}
                  redirectHref="/tutor"
                />
              </div>

              <ConversationThread
                title={selectedConversation.title}
                audience={selectedConversation.audience}
                createdAt={selectedConversation.created_at}
                updatedAt={selectedConversation.updated_at}
                turns={turns}
                showDeleteTurnControls
                redirectHref={`/tutor?conversation=${selectedConversation.id}`}
              />
            </section>
          ) : null}
        </main>
      </section>
    </div>
  );
}