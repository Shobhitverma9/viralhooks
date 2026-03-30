"use client";

import { useState, useEffect } from "react";
import styles from "./home.module.css";
import {
  Zap,
  TrendingUp,
  Users,
  Clock,
  Target,
  Star,
  CheckCircle2,
  Flashlight,
  ShieldCheck,
  Flame,
  MousePointer2,
  X,
  Check,
  Loader2,
} from "lucide-react";

const ViralLogo = () => (
  <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 210, 255, 0.4))' }}>
    <path d="M25 25 L50 78 L75 25" stroke="url(#blueGrad)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 50 C 15 65, 30 65, 35 45 L50 60 L85 15" stroke="url(#goldGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M65 15 L85 15 L85 35" stroke="url(#goldGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d2ff" />
        <stop offset="100%" stopColor="#0051ff" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffcf40" />
        <stop offset="100%" stopColor="#ff5100" />
      </linearGradient>
    </defs>
  </svg>
);

declare global {
  interface Window {
    // Razorpay: any;
  }
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(120);
  const [isClient, setIsClient] = useState(false);
  
  // Payment States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"form" | "verify" | "success">("form");
  const [inviteLink, setInviteLink] = useState("");

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBuyClick = () => {
    setIsModalOpen(true);
    setPaymentStep("form");
  };

  const handleUPIPayment = async () => {
    if (!name || !whatsappNumber) {
      alert("Please enter your name and WhatsApp number");
      return;
    }

    const amount = timeLeft > 0 ? 99 : 999;
    const upiUrl = `upi://pay?pa=paytmqr69vikf@ptys&pn=SurajMaurya&am=${amount}&cu=INR`;

    // Open UPI link
    window.location.href = upiUrl;
    
    // Transition to verification step
    setPaymentStep("verify");
  };

  const confirmPayment = async () => {
    setIsProcessing(true);
    try {
      const amount = timeLeft > 0 ? 99 : 999;
      
      // 1. Record Payment attempt
      await fetch("/api/payment/record", {
        method: "POST",
        body: JSON.stringify({ amount, name, whatsapp_number: whatsappNumber }),
      });

      // Show success screen
      setPaymentStep("success");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <main className={styles.main}>
      {/* Top Value Banner */}
      <div className={styles.topBanner}>
        🔥 LIMITED TIME OFFER: GET THE PACK FOR ₹99 TODAY!
      </div>

      {/* Navigation Header */}
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <ViralLogo />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, marginLeft: '8px' }}>
                <span style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.5px' }}>VIRAL</span>
                <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--accent-blue-light)', letterSpacing: '-0.5px' }}>HOOKS</span>
              </div>
            </div>
            <button onClick={handleBuyClick} className={`${styles.navBtn} btn-primary`}>Buy Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <span className={styles.badge}>
                <Flame size={16} fill="currentColor" /> #1 VIRAL GROWTH KIT FOR
                CREATORS
              </span>
              <h1 className={styles.mainTitle}>
                Stop Guessing, Start{" "}
                <span className="text-gradient-gold">Going Viral</span>
              </h1>
              <p className={styles.mainSubtitle}>
                Unlock the secret strategy used by 5,000+ top influencers to
                command attention and turn scrollers into loyal fans. 2000+
                Proven Hooks at your fingertips.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  flexWrap: "wrap",
                  marginBottom: "40px",
                }}
              >
                <button
                  onClick={handleBuyClick}
                  className="btn-primary"
                  style={{ padding: "18px 40px", fontSize: "1.25rem" }}
                >
                  Get the Pack for {isClient && timeLeft <= 0 ? "₹999" : "₹99"}
                </button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span
                    style={{ color: "var(--accent-gold)", fontWeight: 800 }}
                  >
                    Limited Time Deal!
                  </span>
                  <span>Trusted by 5,000+ active creators</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "24px", opacity: 0.8 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.9rem",
                  }}
                >
                  <ShieldCheck size={20} className="text-gold" />{" "}
                  <span>Safe & Secure</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.9rem",
                  }}
                >
                  <Zap size={20} className="text-gold" />{" "}
                  <span>Instant Access</span>
                </div>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.heroCollage}>
                
                {/* Central Reel Mockup */}
                <div className={`${styles.collageCard} ${styles.cardCenter}`}>
                  <div className={styles.videoMockup}>
                    <h3>HOOK #23: THIS JUST CHANGED MY CHANNEL!</h3>
                    <p className={styles.viewsText}>
                      <TrendingUp size={16} /> 6.1 Millions
                    </p>
                  </div>
                </div>

                {/* Top Right Notification */}
                <div className={`${styles.collageCard} ${styles.cardTopRight}`}>
                  <div className={styles.notiHeader}>
                    <img src="https://i.pravatar.cc/100?u=9" className={styles.notiAvatar} alt="user" />
                    <div>
                      <span className={styles.notiName}>mkinimal</span>
                      <span className={styles.notiTime}>3h</span>
                    </div>
                  </div>
                  <p className={styles.notiText}>Beauty niche! Hooks saved me.</p>
                  <p className={styles.notiEarn}>Earned: <span className="text-gradient-gold">$8,750.00+</span></p>
                </div>

                {/* Left Notification */}
                <div className={`${styles.collageCard} ${styles.cardLeft}`}>
                  <div className={styles.notiHeader}>
                    <img src="https://i.pravatar.cc/100?u=8" className={styles.notiAvatar} alt="user" />
                    <div>
                      <span className={styles.notiName}>colientry392</span>
                      <span className={styles.notiTime}>2h</span>
                    </div>
                  </div>
                  <p className={styles.notiText}>BEST FOOD SECRET EVER! IT WORKS!</p>
                  <p className={styles.notiEarn}>$12,450.00+</p>
                </div>

                {/* Bottom Right Notification (Dark Theme) */}
                <div className={`${styles.collageCard} ${styles.cardBottomRight}`}>
                  <div className={styles.notiHeader}>
                    <img src="https://i.pravatar.cc/100?u=12" className={styles.notiAvatar} alt="user" />
                    <div>
                      <span className={styles.notiName}>fitnessvill</span>
                      <span className={styles.notiTime}>2h</span>
                    </div>
                  </div>
                  <p className={styles.notiText}>HOW I FINALLY GOT VIEWS - 2000+ HOOKS!</p>
                  <p className={styles.viewsText} style={{ color: 'var(--accent-magenta)' }}>
                    <Zap size={16} /> 2.9 Millions!
                  </p>
                </div>

                {/* Floating Badges */}
                <div className={`${styles.floatingBadge} ${styles.badge1}`}>
                  <Flame size={16} fill="currentColor" /> 5M VIRAL!
                </div>
                <div className={`${styles.floatingBadge} ${styles.badge2}`}>
                  <Star size={16} fill="currentColor" /> EXPLODING!
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className={styles.trustBar}>
        <div className="container">
          <div className={styles.trustContent}>
            <div className={styles.trustItem}>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  height: "32px",
                  width: "80px",
                  marginRight: "10px",
                }}
              >
                <img
                  src="https://i.pravatar.cc/100?u=1"
                  alt="User"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "2px solid var(--bg-primary)",
                    position: "absolute",
                    left: "0",
                  }}
                />
                <img
                  src="https://i.pravatar.cc/100?u=2"
                  alt="User"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "2px solid var(--bg-primary)",
                    position: "absolute",
                    left: "16px",
                  }}
                />
                <img
                  src="https://i.pravatar.cc/100?u=3"
                  alt="User"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "2px solid var(--bg-primary)",
                    position: "absolute",
                    left: "32px",
                  }}
                />
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "2px solid var(--bg-primary)",
                    position: "absolute",
                    left: "48px",
                    background: "var(--accent-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    color: "#000",
                    fontWeight: 900,
                  }}
                >
                  +5k
                </div>
              </div>
              Creators Joined
            </div>
            <div className={styles.trustItem}>
              <Star fill="currentColor" size={20} /> 4.9/5 Rating
            </div>
            <div className={styles.trustItem}>
              <TrendingUp size={20} /> Millions of Views Delivered
            </div>
            <div className={styles.trustItem}>
              <ShieldCheck size={20} /> Payment Verified
            </div>
          </div>
        </div>
      </div>

      {/* Hindi Offer Section */}
      <section className={styles.offerSection}>
        <div className="container">
          <div className={`${styles.offerCard} glass-card`}>
            <div className={styles.fireHeadline}>
              <Flame fill="currentColor" /> SPECIAL HINDI CREATOR OFFER
            </div>
            <h2 className={`text-center ${styles.hindiTitle}`}>
              क्या आप अपने Instagram Reels को{" "}
              <span className="text-gold">वायरल</span> करना चाहते हैं?
            </h2>
            <p
              className="text-center"
              style={{
                fontSize: "1.2rem",
                color: "var(--text-secondary)",
                marginBottom: "40px",
              }}
            >
              तो ये आपके लिए एक गेम-चेंजर है 🚀
            </p>

            <div className={styles.hindiBenefitList}>
              <div className={styles.hindiBenefitCard}>
                <CheckCircle2 className={styles.checkIcon} size={32} />
                <div className={styles.benefitText}>
                  <h4>2000+ Ready Viral Hooks</h4>
                  <p>
                    ऐसे हुक्स जो पहले से मिलियन्स व्यूज़ ला चुके हैं – बस कॉपी
                    करें, अपने वीडियो में लगाएँ।
                  </p>
                </div>
              </div>
              <div className={styles.hindiBenefitCard}>
                <Zap className={styles.checkIcon} size={32} />
                <div className={styles.benefitText}>
                  <h4>Daily New Updates</h4>
                  <p>
                    हम रोज़ नए ट्रेंडिंग हुक्स ऐड करते रहते हैं – ताकि आप हमेशा
                    ट्रेंड में रहें।
                  </p>
                </div>
              </div>
              <div className={styles.hindiBenefitCard}>
                <Users className={styles.checkIcon} size={32} />
                <div className={styles.benefitText}>
                  <h4>Lifetime Telegram Access</h4>
                  <p>
                    एक बार जॉइन करो और हमेशा के लिए नए कंटेंट का फायदा उठाओ।
                  </p>
                </div>
              </div>
              <div className={styles.hindiBenefitCard}>
                <Flashlight className={styles.checkIcon} size={32} />
                <div className={styles.benefitText}>
                  <h4>Ready-to-Use Content</h4>
                  <p>
                    कोई एक्स्ट्रा मेहनत नहीं – बस डाउनलोड करो, वीडियो में लगाओ
                    और पोस्ट करो।
                  </p>
                </div>
              </div>
            </div>

            <div
              className="text-center"
              style={{
                background: "rgba(251,191,36,0.1)",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "40px",
              }}
            >
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--accent-gold)",
                  fontWeight: 700,
                }}
              >
                💡 याद रखो – आज के टाइम में VIRAL होना Talent से नहीं, Smart
                Content Strategy से होता है।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className={styles.proofSection}>
        <div className="container">
          <div className={styles.sectionHeading}>
            <h2>
              See The <span className="text-gold">Proof!</span>
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Real People, Real Results with our Bundle
            </p>
          </div>

          <div className={styles.reviewGrid}>
            <div className={styles.testimonial}>
              <div className={styles.userProfile}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&q=80&w=150&h=150"
                  alt="Deepak"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div className={styles.userInfo}>
                  <h5>Deepak S.</h5>
                  <span>@creative_deepak</span>
                </div>
              </div>
              <p className={styles.reviewBody}>
                Used a hook from the book and my Reel just hit{" "}
                <span className={styles.highlight}>5.2 Million views!</span>{" "}
                Absolute game changer! 🚀
              </p>
            </div>

            <div className={styles.testimonial}>
              <div className={styles.userProfile}>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&q=80&w=150&h=150"
                  alt="Sanya"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div className={styles.userInfo}>
                  <h5>Sanya M.</h5>
                  <span>@lifestyle_vlog</span>
                </div>
              </div>
              <p className={styles.reviewBody}>
                I went from 50 views to{" "}
                <span className={styles.highlight}>1.1 Million</span> in one
                day. Unbelievable! 🔥
              </p>
            </div>

            <div className={styles.testimonial}>
              <div className={styles.userProfile}>
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&q=80&w=150&h=150"
                  alt="Ankit"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div className={styles.userInfo}>
                  <h5>Ankit R.</h5>
                  <span>@growth_hacker</span>
                </div>
              </div>
              <p className={styles.reviewBody}>
                The advice works!{" "}
                <span className={styles.highlight}>6 Million views</span> on my
                latest video after following the hook strategy.
              </p>
            </div>

            <div className={styles.testimonial}>
              <div className={styles.userProfile}>
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&q=80&w=150&h=150"
                  alt="Jyoti"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div className={styles.userInfo}>
                  <h5>Jyoti T.</h5>
                  <span>@foodie_jyoti</span>
                </div>
              </div>
              <p className={styles.reviewBody}>
                Followers are just pouring in now!{" "}
                <span className={styles.highlight}>4.8 Million views</span> and
                my audience doubled in a week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA */}
      <div className={styles.stickyBottom}>
        <div className="container">
          <div className={styles.stickyContent}>
            <div className={styles.priceDisplay}>
              {(!isClient || timeLeft > 0) ? (
                <>
                  <span style={{ fontSize: "0.85rem", color: "var(--accent-magenta)", fontWeight: 900, marginBottom: "4px" }}>
                    <Clock size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px", marginBottom: "2px" }} />
                    Limited Offer: {timeString}
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span className={styles.priceNow}>₹99</span>
                    <span className={styles.priceWas}>₹999</span>
                  </div>
                </>
              ) : (
                <>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 700, marginBottom: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>
                    Offer Expired
                  </span>
                  <span className={styles.priceNow}>₹999</span>
                </>
              )}
            </div>
            <button onClick={handleBuyClick} className={`${styles.stickyBtn} btn-primary`}>
              Buy Now & Go Viral{" "}
              <MousePointer2 style={{ marginLeft: "10px" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerLinks}>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/cancellation">Refund Policy</a>
            <a href="/contact">Contact Us</a>
          </div>
          <p className={styles.copyright}>
            © 2024 Viral Hooks Bundle. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Payment / Telegram Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.modalClose} onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </button>

            {paymentStep === "form" ? (
              <>
                <div className={styles.modalHeader}>
                  <h3>Complete Your Order</h3>
                  <p>Enter your details to get instant access</p>
                </div>
                <div className={styles.modalBody}>
                  <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input 
                       type="text" 
                       className={styles.modalInput} 
                       placeholder="e.g. Shobhit Verma"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>WhatsApp Number (without +91)</label>
                    <input 
                      type="text" 
                      className={styles.modalInput} 
                      placeholder="e.g. 9876543210"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                  </div>
                  <button 
                    className={styles.modalSubmit} 
                    onClick={handleUPIPayment}
                  >
                    Pay ₹{timeLeft > 0 ? 99 : 999} via UPI
                  </button>
                  <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    <ShieldCheck size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                    Secure UPI Payment
                  </p>
                </div>
              </>
            ) : paymentStep === "verify" ? (
              <>
                <div className={styles.modalHeader}>
                  <h3>Verifying Payment</h3>
                  <p>Open your UPI app and complete the ₹{timeLeft > 0 ? 99 : 999} payment.</p>
                </div>
                <div className={styles.modalBody}>
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                      Once you've completed the payment in your UPI app, click the button below to get your invite link.
                    </p>
                  </div>
                  <button 
                    className={styles.modalSubmit} 
                    onClick={confirmPayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="animate-spin" style={{ margin: "0 auto" }} />
                    ) : (
                      "I Have Paid - Join Channel"
                    )}
                  </button>
                  <button 
                    style={{ 
                      marginTop: "10px", 
                      background: "transparent", 
                      border: "1px solid var(--border-color)",
                      color: "var(--text-secondary)",
                      width: "100%",
                      padding: "12px",
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      cursor: "pointer"
                    }}
                    onClick={() => setPaymentStep("form")}
                  >
                    Go Back
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <CheckCircle2 size={64} />
                </div>
                <h3>Order Placed Successfully!</h3>
                <p>Click the button below to join our WhatsApp group and get your bundle access.</p>
                
                <a href="https://wa.link/wmorwb" target="_blank" rel="noopener noreferrer" className={styles.inviteLink}>
                  Join WhatsApp Now
                </a>

                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Thank you for your order, <b>{name}</b>!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
