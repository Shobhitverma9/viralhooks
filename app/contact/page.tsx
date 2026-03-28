import Link from 'next/link';
import { Mail, Phone, ArrowLeft, ShieldCheck, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <main style={{ 
      padding: '80px 20px', 
      maxWidth: '1000px', 
      margin: '0 auto', 
      background: 'var(--bg-primary)', 
      minHeight: '100vh', 
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Link href="/" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: 'var(--text-secondary)', 
          textDecoration: 'none',
          marginBottom: '40px',
          fontSize: '0.9rem',
          transition: 'color 0.2s'
        }} className="hover-gold">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 900, 
          marginBottom: '16px',
          background: 'linear-gradient(135.43deg, #ffcf40 0%, #ffae00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Contact Us</h1>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.1rem', 
          lineHeight: '1.6',
          marginBottom: '48px' 
        }}>
          Have questions about the Viral Hooks Bundle? Our team is here to help you supercharge your content strategy. Reach out to us anytime!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Email Card */}
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            borderRadius: '16px', 
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{ 
              background: 'rgba(251, 191, 36, 0.1)', 
              padding: '12px', 
              borderRadius: '12px',
              color: 'var(--accent-gold)'
            }}>
              <Mail size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Us</h3>
              <a href="mailto:viralhooksbundle@gmail.com" style={{ 
                fontSize: '1.2rem', 
                fontWeight: 700, 
                color: 'var(--text-primary)', 
                textDecoration: 'none' 
              }}>viralhooksbundle@gmail.com</a>
            </div>
          </div>

          {/* Phone Card */}
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            borderRadius: '16px', 
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{ 
              background: 'rgba(0, 210, 255, 0.1)', 
              padding: '12px', 
              borderRadius: '12px',
              color: 'var(--accent-blue-light)'
            }}>
              <Phone size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Call / WhatsApp</h3>
              <a href="tel:+919870126712" style={{ 
                fontSize: '1.2rem', 
                fontWeight: 700, 
                color: 'var(--text-primary)', 
                textDecoration: 'none' 
              }}>+91 9870126712</a>
            </div>
          </div>

          {/* Response Time Info */}
          <div style={{ 
            marginTop: '24px',
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(251, 191, 36, 0.05)',
            border: '1px dashed rgba(251, 191, 36, 0.2)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <MessageSquare size={20} style={{ color: 'var(--accent-gold)', marginTop: '2px' }} />
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
              We typically respond within 12-24 hours. For faster support, please include your Telegram username in your message.
            </p>
          </div>
        </div>

        {/* Support Hours */}
        <div style={{ marginTop: '60px', opacity: 0.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} />
            <span>Official Support for Viral Hooks Bundle</span>
          </div>
          <p style={{ fontSize: '0.8rem' }}>© 2024 Viral Hooks Bundle. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
