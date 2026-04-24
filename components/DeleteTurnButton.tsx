'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteTurnButton({
  turnId,
  redirectHref
}: {
  turnId: string;
  redirectHref: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/turns/${turnId}`, {
        method: 'DELETE'
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        window.alert(data.error || 'Could not delete follow-up.');
        return;
      }

      setConfirming(false);
      router.push(redirectHref);
      router.refresh();
    } catch {
      window.alert('Could not delete follow-up.');
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
          padding: '8px 10px',
          minHeight: 34
        }}
      >
        Delete Follow-up
      </button>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gap: 10,
        padding: 12,
        borderRadius: 16,
        border: '1px solid var(--border)',
        background: 'color-mix(in srgb, var(--surface-soft) 86%, transparent)'
      }}
    >
      <p className="small" style={{ margin: 0 }}>
        Delete this follow-up from the thread?
      </p>

      <div className="buttonRow">
        <button
          type="button"
          className="secondary"
          onClick={() => setConfirming(false)}
          style={{ padding: '8px 10px', minHeight: 34 }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          style={{
            padding: '8px 10px',
            minHeight: 34,
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