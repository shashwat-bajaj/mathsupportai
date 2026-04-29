import { createAdminSupabase } from '@/lib/supabase-admin';
import { createClient as createAuthClient } from '@/lib/supabase/server';
import MathTutor from '@/components/MathTutor';
import ConversationThread from '@/components/ConversationThread';
import DeleteConversationButton from '@/components/DeleteConversationButton';
import Reveal from '@/components/Reveal';
import { getSubjectConfig, subjects, type SubjectConfig, type SubjectKey } from '@/lib/subjects';

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

type StudentWorkspacePageProps = {
  searchParams: Promise<{ conversation?: string }>;
  subject?: SubjectKey;
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

function getWorkspaceIntro(subject: SubjectConfig) {
  if (subject.key === 'math') {
    return {
      badge: 'Student workspace',
      signedOutTitle: 'Ask directly, follow up naturally, and keep the math flow going.',
      signedOutDescription:
        'Use this workspace for direct math help, graphing, worked solutions, hints, mistake diagnosis, and practice questions. Signed-in users can also save sessions and revisit them later.',
      signedInTitle: 'A tutor surface built for actual study flow, not one-off answers.',
      signedInDescription:
        'Ask new questions, keep follow-ups inside the same thread, graph when needed, and revisit saved sessions without losing context.',
      defaultFlow:
        'Auto mode, graph-aware follow-ups, and structured tutor continuity.',
      bestFor:
        'Solving, graphing, revising, checking mistakes, and building on earlier work.',
      tutorDescription:
        'Ask a new question or continue an earlier student session with follow-up questions, graph requests, and guided explanation.'
    };
  }

  if (subject.key === 'physics') {
    return {
      badge: 'Physics student workspace',
      signedOutTitle: 'Work through physics concepts, formulas, units, and problem setup.',
      signedOutDescription:
        'Use this workspace for physics explanations, equation-based reasoning, variable setup, unit checks, conceptual questions, and practice prompts. Signed-in users can also save sessions and revisit them later.',
      signedInTitle: 'A physics tutor surface built for concepts, units, and follow-up flow.',
      signedInDescription:
        'Ask new physics questions, continue earlier threads, reason through formulas, and revisit saved sessions without losing context.',
      defaultFlow:
        'Auto mode, concept-first explanations, unit-aware reasoning, and structured tutor continuity.',
      bestFor:
        'Concepts, formulas, units, word problems, checking mistakes, and building on earlier work.',
      tutorDescription:
        'Ask a new physics question or continue an earlier Physics session with follow-up questions, formula reasoning, units, and guided explanation.'
    };
  }

  if (subject.key === 'chemistry') {
    return {
      badge: 'Chemistry student workspace',
      signedOutTitle: 'Work through chemistry reactions, formulas, conversions, and reasoning.',
      signedOutDescription:
        'Use this workspace for chemistry explanations, balancing equations, stoichiometry, molarity, unit conversions, reactions, and practice prompts. Signed-in users can also save sessions and revisit them later.',
      signedInTitle: 'A chemistry tutor surface built for reactions, units, and follow-up flow.',
      signedInDescription:
        'Ask new chemistry questions, continue earlier threads, reason through formulas and reactions, and revisit saved sessions without losing context.',
      defaultFlow:
        'Auto mode, reaction-aware explanations, unit-aware reasoning, and structured tutor continuity.',
      bestFor:
        'Balancing, stoichiometry, reactions, conversions, lab-style reasoning, and checking mistakes.',
      tutorDescription:
        'Ask a new chemistry question or continue an earlier Chemistry session with follow-up questions, equation support, conversions, units, and guided explanation.'
    };
  }

  if (subject.key === 'biology') {
    return {
      badge: 'Biology student workspace',
      signedOutTitle: 'Work through biology vocabulary, systems, processes, and big-picture ideas.',
      signedOutDescription:
        'Use this workspace for biology explanations, process comparisons, vocabulary support, systems thinking, review prompts, and practice questions. Signed-in users can also save sessions and revisit them later.',
      signedInTitle: 'A biology tutor surface built for systems, vocabulary, and follow-up flow.',
      signedInDescription:
        'Ask new biology questions, continue earlier threads, compare processes, and revisit saved sessions without losing context.',
      defaultFlow:
        'Auto mode, process-aware explanations, vocabulary support, and structured tutor continuity.',
      bestFor:
        'Processes, systems, vocabulary, diagrams, comparisons, review, and practice prompts.',
      tutorDescription:
        'Ask a new biology question or continue an earlier Biology session with follow-up questions, process explanations, comparisons, and guided review.'
    };
  }

  return {
    badge: `${subject.name} student workspace`,
    signedOutTitle: `Work through ${subject.name.toLowerCase()} questions with a clearer learning flow.`,
    signedOutDescription:
      `Use this workspace for ${subject.name.toLowerCase()} explanations, guided support, diagnosis, and practice prompts. Signed-in users can also save sessions and revisit them later.`,
    signedInTitle: `A ${subject.name.toLowerCase()} tutor surface built for ongoing study flow.`,
    signedInDescription:
      `Ask new ${subject.name.toLowerCase()} questions, continue earlier threads, and revisit saved sessions without losing context.`,
    defaultFlow:
      'Auto mode, guided explanations, and structured tutor continuity.',
    bestFor:
      `Understanding, revising, checking mistakes, and building on earlier ${subject.name.toLowerCase()} work.`,
    tutorDescription:
      `Ask a new ${subject.name.toLowerCase()} question or continue an earlier session with follow-up questions and guided explanation.`
  };
}

export default async function StudentWorkspacePage({
  searchParams,
  subject = 'math'
}: StudentWorkspacePageProps) {
  const params = await searchParams;
  const selectedConversationId = (params.conversation || '').trim();

  const subjectConfig = getSubjectConfig(subject) || subjects.math;
  const studentWorkspaceHref = `${subjectConfig.path}/tutor`;
  const copy = getWorkspaceIntro(subjectConfig);

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
      .eq('subject', subjectConfig.key)
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
        .eq('subject', subjectConfig.key)
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
      .eq('subject', subjectConfig.key)
      .order('turn_index', { ascending: true })
      .order('created_at', { ascending: true });

    turns = (data || []) as TurnRecord[];
  }

  if (!user) {
    return (
      <div className="grid" style={{ gap: 24 }}>
        <Reveal delay={0.02}>
          <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
            <span className="badge">{copy.badge}</span>

            <div style={{ display: 'grid', gap: 10 }}>
              <h1 style={{ margin: 0 }}>{copy.signedOutTitle}</h1>
              <p className="small" style={{ margin: 0, maxWidth: 840 }}>
                {copy.signedOutDescription}
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <MathTutor
            subject={subjectConfig.key}
            audience="student"
            title={`Tutor Support for ${subjectConfig.name} Students`}
            description={copy.tutorDescription}
          />
        </Reveal>
      </div>
    );
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <span className="badge">{copy.badge}</span>
            <h1 style={{ margin: 0 }}>{copy.signedInTitle}</h1>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              {copy.signedInDescription} Signed in as <strong>{user.email}</strong>.
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
                {conversations.length} available in your {subjectConfig.name.toLowerCase()} student history.
              </p>
            </div>

            <div className="card innerFeatureCard">
              <p className="small" style={{ margin: '0 0 4px' }}>
                <strong>Default flow</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                {copy.defaultFlow}
              </p>
            </div>

            <div className="card innerFeatureCard">
              <p className="small" style={{ margin: '0 0 4px' }}>
                <strong>Best for</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                {copy.bestFor}
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <div className="studentWorkspacePaneWrap">
        <section className="twoPane">
          <Reveal delay={0.08}>
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
                <h2 style={{ margin: 0 }}>{subjectConfig.name} Sessions</h2>
                <p className="small" style={{ margin: 0 }}>
                  Open an earlier thread or start a new one.
                </p>
              </div>

              <div className="buttonRow">
                <a className="btn secondary" href={studentWorkspaceHref}>
                  New Session
                </a>
              </div>

              {conversations.length === 0 ? (
                <div className="card questionSurface" style={{ padding: 14 }}>
                  <p className="small" style={{ margin: 0 }}>
                    No saved {subjectConfig.name.toLowerCase()} student sessions yet.
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
                        <a
                          href={`${studentWorkspaceHref}?conversation=${conversation.id}`}
                          style={{ display: 'block' }}
                        >
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
                            redirectHref={studentWorkspaceHref}
                            compact
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </aside>
          </Reveal>

          <Reveal delay={0.14}>
            <main style={{ display: 'grid', gap: 18, minWidth: 0 }}>
              <MathTutor
                subject={subjectConfig.key}
                audience="student"
                initialConversationId={selectedConversation?.id || null}
                newSessionHref={studentWorkspaceHref}
                title={`Tutor Support for ${subjectConfig.name} Students`}
                description={copy.tutorDescription}
              />

              {selectedConversation && turns.length > 0 ? (
                <section className="card" style={{ display: 'grid', gap: 16 }}>
                  <div className="buttonRow" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'grid', gap: 4 }}>
                      <h2 style={{ margin: 0 }}>Current Session Thread</h2>
                      <p className="small" style={{ margin: 0 }}>
                        View the full question-and-answer flow for this {subjectConfig.name.toLowerCase()} student session.
                      </p>
                    </div>

                    <DeleteConversationButton
                      conversationId={selectedConversation.id}
                      redirectHref={studentWorkspaceHref}
                    />
                  </div>

                  <ConversationThread
                    title={selectedConversation.title}
                    audience={selectedConversation.audience}
                    createdAt={selectedConversation.created_at}
                    updatedAt={selectedConversation.updated_at}
                    turns={turns}
                    showDeleteTurnControls
                    redirectHref={`${studentWorkspaceHref}?conversation=${selectedConversation.id}`}
                    graphingEnabled={subjectConfig.features.graphing}
                  />
                </section>
              ) : null}
            </main>
          </Reveal>
        </section>
      </div>
    </div>
  );
}