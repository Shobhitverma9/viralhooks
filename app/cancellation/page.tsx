import Link from 'next/link';

export default function Cancellation() {
  return (
    <main style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <h1 style={{ color: 'var(--accent-gold)', marginBottom: '30px' }}>Cancellation & Refund Policy</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Digital Goods Policy</h2>
        <p>The Viral Hooks Bundle is a digital product. Once the purchase is made and the access links are delivered instantly via email or download page, the item is considered "used".</p>

        <h2>2. No Refunds</h2>
        <p>Due to the easily copiable nature of digital goods, <strong>all sales are final and non-refundable</strong>. Please make sure that you have carefully read the product description before making a purchase.</p>

        <h2>3. Cancellation</h2>
        <p>Since the product is delivered instantly upon payment, there is no physical shipping or recurring subscription to cancel. Your single payment grants you lifetime access.</p>

        <h2>4. Exceptional Circumstances</h2>
        <p>If you encounter technical issues accessing the file or joining the Telegram group, please contact our support. We will ensure you receive the product you paid for.</p>
        
        <div style={{ marginTop: '40px' }}>
          <Link href="/" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>&larr; Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
