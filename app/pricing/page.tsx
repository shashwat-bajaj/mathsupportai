export default function PricingPage() {
  return (
    <div className="grid cols-3">
      <div className="card" style={{ borderColor: '#7c3aed' }}>
        <h2>Free Beta</h2>
        <div className="price">$0</div>
        <ul className="list">
          <li>Unlimited testing during the beta phase</li>
          <li>Step-by-step math support</li>
          <li>Hints, teaching mode, quiz mode, and diagnosis mode</li>
          <li>Early feedback will help shape the full product</li>
        </ul>
      </div>

      <div className="card">
        <h2>What is coming later</h2>
        <div className="price">Soon</div>
        <ul className="list">
          <li>Saved history</li>
          <li>Personalized study plans</li>
          <li>Mastery tracking</li>
          <li>Revision packs</li>
          <li>Paid plans after international setup is ready</li>
        </ul>
      </div>

      <div className="card">
        <h2>Current goal</h2>
        <div className="price">Build</div>
        <ul className="list">
          <li>Test tutor quality</li>
          <li>Improve learning flow</li>
          <li>Collect beta users</li>
          <li>Prepare for future launch from UAE / Portugal</li>
        </ul>
      </div>
    </div>
  );
}