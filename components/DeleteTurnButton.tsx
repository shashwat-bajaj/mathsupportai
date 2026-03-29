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
        style={{ padding: '8px 10px' }}
      >
        Delete Follow-up
      </button>
    );
  }

  return (
    <div className="buttonRow">
      <span className="small">Delete this follow-up?</span>
      <button
        type="button"
        className="secondary"
        onClick={() => setConfirming(false)}
        style={{ padding: '8px 10px' }}
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        style={{ padding: '8px 10px' }}
      >
        {loading ? 'Deleting...' : 'Delete permanently'}
      </button>
    </div>
  );
}