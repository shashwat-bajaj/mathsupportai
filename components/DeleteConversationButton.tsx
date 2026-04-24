'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteConversationButton({
  conversationId,
  redirectHref,
  compact = false
}: {
  conversationId: string;
  redirectHref: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const compactPadding = compact ? '8px 10px' : '10px 12px';

  async function handleDelete() {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/conversations/${conversationId}`, {
        method: 'DELETE'
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        window.alert(data.error || 'Could not delete conversation.');
        return;
      }

      setConfirming(false);
      router.push(redirectHref);
      router.refresh();
    } catch {
      window.alert('Could not delete conversation.');
    } finally {
      setLoading(false);
    }
  }

  if (!confirming) {
    return (
      <button
        type="button"
        className="secondary"
        onClick={() => setConfirming(true)}
        style={{
          padding: compactPadding,
          minHeight: compact ? 34 : 38
        }}
      >
        Delete
      </button>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gap: 10,
        width: '100%',
        padding: compact ? 0 : 12,
        borderRadius: compact ? 0 : 16,
        border: compact ? 'none' : '1px solid var(--border)',
        background: compact ? 'transparent' : 'color-mix(in srgb, var(--surface-soft) 86%, transparent)'
      }}
    >
      <p className="small" style={{ margin: 0 }}>
        Confirm permanent deletion of this conversation?
      </p>

      <div className="buttonRow">
        <button
          type="button"
          className="secondary"
          onClick={() => setConfirming(false)}
          style={{ padding: compactPadding, minHeight: compact ? 34 : 38 }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          style={{
            padding: compactPadding,
            minHeight: compact ? 34 : 38,
            background:
              'linear-gradient(135deg, rgba(210,72,87,0.92), rgba(175,36,57,0.98))',
            boxShadow: '0 10px 22px rgba(175,36,57,0.18)'
          }}
        >
          {loading ? 'Deleting...' : 'Delete permanently'}
        </button>
      </div>
    </div>
  );
}