import Link from 'next/link';

export default function Privacy() {
  return (
    <main style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <h1 style={{ color: 'var(--accent-gold)', marginBottom: '30px' }}>Privacy Policy</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>When you purchase the Viral Hooks Bundle, we collect your name, email address, and phone number to process the transaction and deliver the digital product.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information exclusively to: process your payment, deliver the digital product, invite you to the Telegram community, and send important updates about the product.</p>

        <h2>3. Payment Processing</h2>
        <p>We use Razorpay as our payment gateway. We do not store your credit card or sensitive payment details on our servers. Razorpay securely processes all transactions.</p>

        <h2>4. Data Sharing</h2>
        <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
        
        <div style={{ marginTop: '40px' }}>
          <Link href="/" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>&larr; Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
