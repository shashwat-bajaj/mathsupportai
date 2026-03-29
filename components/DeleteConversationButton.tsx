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

  async function handleDelete() {
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
        style={{ padding: compact ? '8px 10px' : '10px 12px' }}
      >
        Delete
      </button>
    );
  }

  return (
    <div className="buttonRow">
      <span className="small">Confirm delete?</span>
      <button
        type="button"
        className="secondary"
        onClick={() => setConfirming(false)}
        style={{ padding: compact ? '8px 10px' : '10px 12px' }}
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        style={{ padding: compact ? '8px 10px' : '10px 12px' }}
      >
        {loading ? 'Deleting...' : 'Delete permanently'}
      </button>
    </div>
  );
}