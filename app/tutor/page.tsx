import { createAdminSupabase } from '@/lib/supabase-admin';
import { createClient as createAuthClient } from '@/lib/supabase/server';
import MathTutor from '@/components/MathTutor';
import ConversationThread from '@/components/ConversationThread';

export const dynamic = 'force-dynamic';

function makePreview(text: string, max = 80) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}...` : text;
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

  let conversations: any[] = [];
  let turns: any[] = [];

  if (user?.id) {
    const { data } = await supabase
      .from('learner_conversations')
      .select('id, title, audience, created_at, updated_at')
      .eq('user_id', user.id)
      .eq('audience', 'student')
      .order('updated_at', { ascending: false })
      .limit(30);

    conversations = data || [];
  }

  const selectedConversation =
    selectedConversationId
      ? conversations.find((conversation) => conversation.id === selectedConversationId) || null
      : null;

  if (selectedConversation) {
    const { data } = await supabase
      .from('learner_sessions')
      .select('id, turn_index, mode, level, prompt, response, created_at')
      .eq('conversation_id', selectedConversation.id)
      .order('turn_index', { ascending: true })
      .order('created_at', { ascending: true });

    turns = data || [];
  }

  if (!user) {
    return (
      <MathTutor
        audience="student"
        title="Tutor Support for Students"
        description="Use this page for direct math help, worked solutions, hints, diagnosis mode, and practice questions."
      />
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '260px minmax(0, 1fr)',
        gap: 18,
        alignItems: 'start'
      }}
    >
      <aside
        className="card"
        style={{
          position: 'sticky',
          top: 88,
          alignSelf: 'start'
        }}
      >
        <h2 style={{ marginTop: 0 }}>Student Sessions</h2>

        <div className="buttonRow" style={{ marginBottom: 12 }}>
          <a className="btn secondary" href="/tutor">
            New Session
          </a>
        </div>

        {conversations.length === 0 ? (
          <p className="small">No saved student sessions yet.</p>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {conversations.map((conversation) => {
              const isActive = selectedConversation?.id === conversation.id;

              return (
                <a
                  key={conversation.id}
                  href={`/tutor?conversation=${conversation.id}`}
                  style={{
                    display: 'block',
                    padding: 12,
                    border: `1px solid ${
                      isActive ? 'rgba(124, 58, 237, 0.9)' : 'var(--border)'
                    }`,
                    borderRadius: 12,
                    background: isActive ? 'rgba(124, 58, 237, 0.12)' : '#0f162d'
                  }}
                >
                  <p className="small" style={{ margin: '0 0 6px' }}>
                    <strong>{conversation.title || 'Untitled conversation'}</strong>
                  </p>
                  <p className="small" style={{ margin: '0 0 6px' }}>
                    Updated {formatDate(conversation.updated_at)}
                  </p>
                  <p style={{ margin: 0 }}>
                    {makePreview(conversation.title || 'New conversation')}
                  </p>
                </a>
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
          description="Ask a new question or continue an earlier session with follow-up questions."
        />

        {selectedConversation && turns.length > 0 ? (
          <section className="card" style={{ display: 'grid', gap: 14 }}>
            <h2 style={{ margin: 0 }}>Current Session Thread</h2>
            <ConversationThread
              title={selectedConversation.title}
              audience={selectedConversation.audience}
              createdAt={selectedConversation.created_at}
              updatedAt={selectedConversation.updated_at}
              turns={turns}
            />
          </section>
        ) : null}
      </main>
    </div>
  );
}