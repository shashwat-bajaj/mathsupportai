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

type ParentWorkspacePageProps = {
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

function getParentWorkspaceCopy(subject: SubjectConfig) {
  if (subject.key === 'math') {
    return {
      badge: 'Parent workspace',
      signedOutTitle:
        'Guidance for helping a child learn, without jumping straight to the final answer.',
      signedOutDescription:
        'Use this workspace when you want parent-friendly explanation, simple examples, talking points, likely-mistake guidance, and practice prompts that help a child understand the concept more clearly.',
      signedInTitle:
        'A calmer support surface for adults helping a child learn math more clearly.',
      signedInDescription:
        'Ask for simpler explanations, talking points, examples, likely-mistake guidance, and practice prompts without forcing the interaction into a full worked solution.',
      defaultFlow:
        'Guided hint mode with child-level explanation and parent-friendly support.',
      bestFor:
        'Explaining concepts aloud, giving examples, spotting confusion, and supporting practice.',
      tutorDescription:
        'Use this version when you want parent-friendly guidance, simpler explanation, talking points, examples, and practice prompts without jumping straight to the full solution.',
      placeholder:
        'Example: My child is learning long division and gets confused after the first subtraction step. How can I explain it clearly?'
    };
  }

  if (subject.key === 'physics') {
    return {
      badge: 'Physics parent workspace',
      signedOutTitle:
        'Guidance for helping a child understand physics without simply giving the answer.',
      signedOutDescription:
        'Use this workspace when you want parent-friendly physics explanations, simple examples, talking points, likely-mistake guidance, and practice prompts that help a child understand the concept more clearly.',
      signedInTitle:
        'A calmer support surface for adults helping a child learn physics more clearly.',
      signedInDescription:
        'Ask for simpler explanations, everyday analogies, formula setup guidance, unit-checking support, likely-mistake guidance, and practice prompts without turning everything into a full worked solution.',
      defaultFlow:
        'Guided hint mode with concept-first explanation, parent-friendly language, and unit-aware support.',
      bestFor:
        'Explaining concepts aloud, connecting formulas to meaning, spotting confusion, and supporting practice.',
      tutorDescription:
        'Use this version when you want parent-friendly Physics guidance, simpler explanations, talking points, examples, and practice prompts without jumping straight to a full solution.',
      placeholder:
        "Example: My child is learning Newton's second law and keeps mixing up force, mass, and acceleration. How can I explain it clearly?"
    };
  }

  return {
    badge: `${subject.name} parent workspace`,
    signedOutTitle:
      `Guidance for helping a child understand ${subject.name.toLowerCase()} more clearly.`,
    signedOutDescription:
      `Use this workspace when you want parent-friendly ${subject.name.toLowerCase()} explanations, examples, talking points, likely-mistake guidance, and practice prompts.`,
    signedInTitle:
      `A calmer support surface for adults helping a child learn ${subject.name.toLowerCase()} more clearly.`,
    signedInDescription:
      `Ask for simpler explanations, examples, likely-mistake guidance, and practice prompts for ${subject.name.toLowerCase()} learning.`,
    defaultFlow:
      'Guided hint mode with child-level explanation and parent-friendly support.',
    bestFor:
      'Explaining concepts aloud, giving examples, spotting confusion, and supporting practice.',
    tutorDescription:
      `Use this version when you want parent-friendly ${subject.name} guidance without jumping straight to the full answer.`,
    placeholder:
      `Example: My child is learning a ${subject.name.toLowerCase()} topic and feels stuck. How can I explain it clearly?`
  };
}

export default async function ParentWorkspacePage({
  searchParams,
  subject = 'math'
}: ParentWorkspacePageProps) {
  const params = await searchParams;
  const selectedConversationId = (params.conversation || '').trim();

  const subjectConfig = getSubjectConfig(subject) || subjects.math;
  const parentWorkspaceHref = `${subjectConfig.path}/parents`;
  const copy = getParentWorkspaceCopy(subjectConfig);

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
            audience="parent"
            lockedMode="hint"
            title={`Tutor Support for ${subjectConfig.name} Parents`}
            description={copy.tutorDescription}
            placeholder={copy.placeholder}
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
                {conversations.length} available in your {subjectConfig.name.toLowerCase()} parent history.
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

      <div className="parentWorkspacePaneWrap">
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
                <h2 style={{ margin: 0 }}>{subjectConfig.name} Parent Sessions</h2>
                <p className="small" style={{ margin: 0 }}>
                  Open an earlier parent thread or start a new one.
                </p>
              </div>

              <div className="buttonRow">
                <a className="btn secondary" href={parentWorkspaceHref}>
                  New Session
                </a>
              </div>

              {conversations.length === 0 ? (
                <div className="card questionSurface" style={{ padding: 14 }}>
                  <p className="small" style={{ margin: 0 }}>
                    No saved {subjectConfig.name.toLowerCase()} parent sessions yet.
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
                          href={`${parentWorkspaceHref}?conversation=${conversation.id}`}
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
                            redirectHref={parentWorkspaceHref}
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
                audience="parent"
                lockedMode="hint"
                initialConversationId={selectedConversation?.id || null}
                newSessionHref={parentWorkspaceHref}
                title={`Tutor Support for ${subjectConfig.name} Parents`}
                description={copy.tutorDescription}
                placeholder={copy.placeholder}
              />

              {selectedConversation && turns.length > 0 ? (
                <section className="card" style={{ display: 'grid', gap: 16 }}>
                  <div className="buttonRow" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'grid', gap: 4 }}>
                      <h2 style={{ margin: 0 }}>Current Session Thread</h2>
                      <p className="small" style={{ margin: 0 }}>
                        View the full question-and-answer flow for this {subjectConfig.name.toLowerCase()} parent session.
                      </p>
                    </div>

                    <DeleteConversationButton
                      conversationId={selectedConversation.id}
                      redirectHref={parentWorkspaceHref}
                    />
                  </div>

                  <ConversationThread
                    title={selectedConversation.title}
                    audience={selectedConversation.audience}
                    createdAt={selectedConversation.created_at}
                    updatedAt={selectedConversation.updated_at}
                    turns={turns}
                    showDeleteTurnControls
                    redirectHref={`${parentWorkspaceHref}?conversation=${selectedConversation.id}`}
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