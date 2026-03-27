import Link from 'next/link';

export default function Terms() {
  return (
    <main style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <h1 style={{ color: 'var(--accent-gold)', marginBottom: '30px' }}>Terms of Service</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Overview</h2>
        <p>By purchasing the Viral Hooks Bundle, you agree to these terms. This product is a digital download providing social media content hooks.</p>

        <h2>2. Delivery</h2>
        <p>Upon successful payment, you will receive immediate access to the digital bundle and Telegram community link.</p>

        <h2>3. License & Usage</h2>
        <p>You may use these hooks for your personal or business social media accounts. However, you may not resell, redistribute, or share the bundle itself with unauthorized third parties.</p>

        <h2>4. Lifetime Access</h2>
        <p>"Lifetime" refers to the lifetime of the product. As long as the Viral Hooks Bundle remains active, you will have access to updates and the Telegram group.</p>
        
        <div style={{ marginTop: '40px' }}>
          <Link href="/" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>&larr; Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
