import AnswerDisplay from '@/components/AnswerDisplay';

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function ConversationThread({
  title,
  audience,
  createdAt,
  updatedAt,
  turns
}: {
  title: string | null;
  audience: string;
  createdAt: string;
  updatedAt: string;
  turns: Array<{
    id: string;
    turn_index: number | null;
    mode: string;
    level: string;
    prompt: string;
    response: string;
    created_at: string;
  }>;
}) {
  return (
    <div className="grid" style={{ gap: 18 }}>
      <div className="card threadHeader">
        <p className="small">
          <strong>Title:</strong> {title || 'Untitled conversation'}
        </p>
        <p className="small">
          <strong>Audience:</strong> {audience}
        </p>
        <p className="small">
          <strong>Started:</strong> {formatDate(createdAt)}
        </p>
        <p className="small">
          <strong>Last updated:</strong> {formatDate(updatedAt)}
        </p>
      </div>

      <div className="threadTurns">
        {turns.map((turn, index) => {
          const label = index === 0 ? 'Initial Question' : `Follow-up ${index}`;

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
                    <AnswerDisplay text={turn.response} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}