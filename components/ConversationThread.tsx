import AnswerDisplay from '@/components/AnswerDisplay';
import DeleteTurnButton from '@/components/DeleteTurnButton';
import FunctionGraph from '@/components/FunctionGraph';
import {
  extractRememberedGraphExpression,
  isGraphReferenceRequest
} from '@/lib/graphing';

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function formatAudienceLabel(value: string) {
  if (!value) return 'Unknown';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatModeLabel(value: string) {
  switch (value) {
    case 'auto':
      return 'Auto';
    case 'teach':
      return 'Teach';
    case 'hint':
      return 'Hint';
    case 'diagnose':
      return 'Diagnose';
    case 'quiz':
      return 'Quiz';
    default:
      return value;
  }
}

function formatTurnLabel(index: number) {
  return index === 0 ? 'Initial Question' : `Follow-up ${index}`;
}

export default function ConversationThread({
  title,
  audience,
  createdAt,
  updatedAt,
  turns,
  showDeleteTurnControls = false,
  redirectHref
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
  showDeleteTurnControls?: boolean;
  redirectHref?: string;
}) {
  let lastKnownGraphExpression = '';

  return (
    <div className="grid" style={{ gap: 18 }}>
      <div className="card threadHeader" style={{ display: 'grid', gap: 14 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <h3 style={{ margin: 0 }}>{title || 'Untitled conversation'}</h3>
          <p className="small" style={{ margin: 0 }}>
            Full session thread with saved questions, tutor responses, and graph context where
            relevant.
          </p>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12
          }}
        >
          <div className="card questionSurface" style={{ padding: 14 }}>
            <p className="small" style={{ margin: '0 0 4px' }}>
              <strong>Audience</strong>
            </p>
            <p style={{ margin: 0 }}>{formatAudienceLabel(audience)}</p>
          </div>

          <div className="card questionSurface" style={{ padding: 14 }}>
            <p className="small" style={{ margin: '0 0 4px' }}>
              <strong>Started</strong>
            </p>
            <p style={{ margin: 0 }}>{formatDate(createdAt)}</p>
          </div>

          <div className="card questionSurface" style={{ padding: 14 }}>
            <p className="small" style={{ margin: '0 0 4px' }}>
              <strong>Last updated</strong>
            </p>
            <p style={{ margin: 0 }}>{formatDate(updatedAt)}</p>
          </div>
        </div>
      </div>

      <div className="threadTurns">
        {turns.map((turn, index) => {
          const rememberedCandidate =
            audience === 'student' ? extractRememberedGraphExpression(turn.prompt) : '';

          if (rememberedCandidate) {
            lastKnownGraphExpression = rememberedCandidate;
          }

          const requestedGraphContext =
            audience === 'student' && isGraphReferenceRequest(turn.prompt);

          const graphExpression =
            audience === 'student' && requestedGraphContext
              ? rememberedCandidate || lastKnownGraphExpression
              : '';

          return (
            <div key={turn.id} className="card turnCard" style={{ display: 'grid', gap: 14 }}>
              <div className="turnLabelRow">
                <div style={{ display: 'grid', gap: 8 }}>
                  <span className="turnLabel">{formatTurnLabel(index)}</span>
                  <p className="small" style={{ margin: 0 }}>
                    {formatModeLabel(turn.mode)} • {turn.level} • {formatDate(turn.created_at)}
                  </p>
                </div>

                {showDeleteTurnControls && index > 0 && redirectHref ? (
                  <DeleteTurnButton turnId={turn.id} redirectHref={redirectHref} />
                ) : null}
              </div>

              <div className="grid" style={{ gap: 12 }}>
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 10 }}>Question</h3>
                  <div className="card questionSurface">
                    <div className="question-block">{turn.prompt}</div>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 10 }}>Answer</h3>
                  <div className="card answerSurface">
                    <AnswerDisplay text={turn.response} />
                  </div>
                </div>

                {graphExpression ? (
                  <div>
                    <h3 style={{ marginTop: 0, marginBottom: 10 }}>Graph</h3>
                    <FunctionGraph expression={graphExpression} />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}