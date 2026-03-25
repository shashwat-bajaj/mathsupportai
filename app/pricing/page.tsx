export default function PricingPage() {
  return (
    <div className="grid cols-3">
      <div className="card" style={{ borderColor: '#7c3aed' }}>
        <h2>Free Beta</h2>
        <div className="price">$0</div>
        <ul className="list">
          <li>Step-by-step math support</li>
          <li>Hints, diagnosis mode, and quiz mode</li>
          <li>Saved history during beta</li>
          <li>Early access while the product is evolving</li>
        </ul>
      </div>

      <div className="card">
        <h2>Planned Premium</h2>
        <div className="price">Soon</div>
        <ul className="list">
          <li>Secure user accounts</li>
          <li>Private saved sessions</li>
          <li>Follow-up tutor threads</li>
          <li>Study plans and revision packs</li>
          <li>Graphing and richer math tools</li>
        </ul>
      </div>

      <div className="card">
        <h2>Future Family / Access Options</h2>
        <div className="price">Later</div>
        <ul className="list">
          <li>Parent and tutor support mode</li>
          <li>Family access ideas</li>
          <li>Promo and gifted premium access</li>
          <li>Expanded learning workflows</li>
        </ul>
      </div>
    </div>
  );
}