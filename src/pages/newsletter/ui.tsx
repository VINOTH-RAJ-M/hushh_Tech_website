"use client";

import { useState } from "react";

const TOPICS = [
  { id: "product", label: "Product updates", description: "New features, releases, and the hussh roadmap." },
  { id: "privacy", label: "Privacy & policy", description: "Consent architecture, data rights, and regulatory changes." },
  { id: "agents", label: "AI agents", description: "Personal agent research, protocols, and ecosystem news." },
  { id: "founders", label: "Founder notes", description: "Essays and dispatches from Manish and the team." },
  { id: "developers", label: "Developer digest", description: "API updates, SDKs, and open-source releases." },
];

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set(["product"]));
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasTopics = selected.size > 0;

  function toggleTopic(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValidEmail || !hasTopics) return;

    setStatus("loading");
    // Replace with real API call
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <span style={styles.hushhLogo}>🤫</span>
          <h2 style={styles.successHeading}>You're on the list.</h2>
          <p style={styles.successBody}>
            We'll reach you at <strong style={{ color: "var(--accent)" }}>{email}</strong> — only for
            the topics you chose, only when there's something worth saying.
          </p>
          <p style={styles.successNote}>
            Your email will never be sold. Your preferences stay yours.
            You can unsubscribe in one click, any time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Nav */}
      <nav style={styles.nav}>
        <a href="https://hushh.ai" style={styles.navBrand}>🤫hussh</a>
        <div style={styles.navLinks}>
          <a href="/one" style={styles.navLink}>One</a>
          <a href="/privacy" style={styles.navLink}>Privacy</a>
          <a href="/developers" style={styles.navLink}>Developers</a>
        </div>
      </nav>

      {/* Hero */}
      <header style={styles.hero}>
        <p style={styles.eyebrow}>NEWSLETTER</p>
        <h1 style={styles.heading}>
          Signal, not noise.
        </h1>
        <p style={styles.subheading}>
          Updates from hussh — on your terms. Choose what you care about.
          We send when there's something worth saying.
        </p>
      </header>

      {/* Form */}
      <main style={styles.main}>
        <form onSubmit={handleSubmit} noValidate style={styles.form}>

          {/* Email */}
          <section style={styles.section}>
            <label htmlFor="email" style={styles.label}>Your email</label>
            <div style={styles.inputWrapper}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="you@example.com"
                style={{
                  ...styles.input,
                  ...(touched && !isValidEmail ? styles.inputError : {}),
                }}
                autoComplete="email"
                spellCheck={false}
              />
              {touched && !isValidEmail && (
                <p style={styles.errorMsg}>Enter a valid email address.</p>
              )}
            </div>
          </section>

          {/* Topics */}
          <section style={styles.section}>
            <label style={styles.label}>Topics</label>
            <p style={styles.labelHint}>Pick at least one.</p>
            <div style={styles.topicsGrid}>
              {TOPICS.map((topic) => {
                const active = selected.has(topic.id);
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    style={{
                      ...styles.topicCard,
                      ...(active ? styles.topicCardActive : {}),
                    }}
                    aria-pressed={active}
                  >
                    <div style={styles.topicHeader}>
                      <span style={styles.topicLabel}>{topic.label}</span>
                      <span style={{
                        ...styles.topicCheck,
                        ...(active ? styles.topicCheckActive : {}),
                      }}>
                        {active ? "✓" : "+"}
                      </span>
                    </div>
                    <p style={styles.topicDesc}>{topic.description}</p>
                  </button>
                );
              })}
            </div>
            {touched && !hasTopics && (
              <p style={styles.errorMsg}>Select at least one topic.</p>
            )}
          </section>

          {/* Consent notice */}
          <section style={styles.consentRow}>
            <span style={styles.consentIcon}>🔒</span>
            <p style={styles.consentText}>
              Your email is used only to send the topics you select.
              hussh never sells your data. Unsubscribe any time — one click, no friction.
            </p>
          </section>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              ...styles.submitBtn,
              ...(status === "loading" ? styles.submitBtnLoading : {}),
            }}
          >
            {status === "loading" ? (
              <span style={styles.loadingDots}>
                <span style={{ ...styles.dot, animationDelay: "0s" }} />
                <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
                <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
              </span>
            ) : (
              "Subscribe →"
            )}
          </button>

        </form>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.footerLoc}>Kirkland, WA</span>
        <div style={styles.footerLinks}>
          <a href="/privacy" style={styles.footerLink}>Privacy</a>
          <a href="/terms" style={styles.footerLink}>Terms</a>
          <a href="/one" style={styles.footerLink}>One</a>
        </div>
      </footer>

      <style>{cssAnimations}</style>
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const cssAnimations = `
  :root {
    --bg: #0a0a0b;
    --surface: #111113;
    --surface2: #18181c;
    --border: rgba(255,255,255,0.08);
    --border-active: rgba(255,255,255,0.28);
    --text: #f0eeeb;
    --muted: #7a7875;
    --accent: #e8d9c0;
    --accent-glow: rgba(232, 217, 192, 0.12);
    --error: #e07070;
    --font-display: 'Georgia', 'Times New Roman', serif;
    --font-body: 'Helvetica Neue', 'Arial', sans-serif;
  }

  @keyframes dotBounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40% { transform: translateY(-5px); opacity: 1; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0b",
    color: "#f0eeeb",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
  },

  // Nav
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  navBrand: {
    color: "#f0eeeb",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: 600,
    letterSpacing: "-0.02em",
  },
  navLinks: {
    display: "flex",
    gap: "28px",
  },
  navLink: {
    color: "#7a7875",
    textDecoration: "none",
    fontSize: "14px",
    letterSpacing: "0.02em",
    transition: "color 0.15s",
  },

  // Hero
  hero: {
    maxWidth: "680px",
    margin: "0 auto",
    padding: "80px 40px 48px",
    textAlign: "left",
    animation: "fadeUp 0.5s ease both",
  },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "0.14em",
    color: "#7a7875",
    marginBottom: "20px",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  heading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(36px, 5vw, 56px)",
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    margin: "0 0 20px",
    color: "#f0eeeb",
  },
  subheading: {
    fontSize: "18px",
    lineHeight: 1.65,
    color: "#9e9b97",
    margin: 0,
    maxWidth: "520px",
  },

  // Main
  main: {
    flex: 1,
    maxWidth: "680px",
    margin: "0 auto",
    padding: "0 40px 80px",
    width: "100%",
    boxSizing: "border-box",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: "#c4c0bb",
    textTransform: "uppercase",
  },
  labelHint: {
    fontSize: "13px",
    color: "#7a7875",
    margin: "-4px 0 4px",
  },

  // Input
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    backgroundColor: "#111113",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#f0eeeb",
    fontSize: "16px",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  inputError: {
    borderColor: "#e07070",
  },
  errorMsg: {
    fontSize: "13px",
    color: "#e07070",
    margin: 0,
  },

  // Topics
  topicsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "10px",
  },
  topicCard: {
    background: "#111113",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "16px 18px",
    cursor: "pointer",
    textAlign: "left",
    transition: "border-color 0.2s, background 0.2s",
  },
  topicCardActive: {
    background: "rgba(232, 217, 192, 0.06)",
    borderColor: "rgba(232, 217, 192, 0.35)",
  },
  topicHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  topicLabel: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#f0eeeb",
  },
  topicCheck: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    color: "#7a7875",
    transition: "all 0.2s",
  },
  topicCheckActive: {
    background: "#e8d9c0",
    borderColor: "#e8d9c0",
    color: "#0a0a0b",
    fontWeight: 700,
  },
  topicDesc: {
    fontSize: "13px",
    color: "#7a7875",
    lineHeight: 1.5,
    margin: 0,
  },

  // Consent
  consentRow: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    padding: "16px 18px",
    background: "#111113",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
  },
  consentIcon: {
    fontSize: "16px",
    flexShrink: 0,
    marginTop: "1px",
  },
  consentText: {
    fontSize: "13px",
    color: "#7a7875",
    lineHeight: 1.6,
    margin: 0,
  },

  // Submit
  submitBtn: {
    padding: "16px 32px",
    background: "#e8d9c0",
    color: "#0a0a0b",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    cursor: "pointer",
    alignSelf: "flex-start",
    minWidth: "160px",
    transition: "opacity 0.2s, transform 0.1s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "52px",
  },
  submitBtnLoading: {
    opacity: 0.7,
    cursor: "not-allowed",
  },

  // Loading dots
  loadingDots: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#0a0a0b",
    display: "inline-block",
    animation: "dotBounce 1.2s infinite ease-in-out",
  },

  // Success
  successCard: {
    maxWidth: "560px",
    margin: "120px auto",
    padding: "0 40px",
    animation: "fadeUp 0.5s ease both",
  },
  hushhLogo: {
    fontSize: "40px",
    display: "block",
    marginBottom: "28px",
  },
  successHeading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "40px",
    fontWeight: 400,
    letterSpacing: "-0.03em",
    margin: "0 0 20px",
    color: "#f0eeeb",
  },
  successBody: {
    fontSize: "18px",
    lineHeight: 1.65,
    color: "#9e9b97",
    margin: "0 0 16px",
  },
  successNote: {
    fontSize: "14px",
    color: "#7a7875",
    lineHeight: 1.6,
    margin: 0,
    paddingTop: "16px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },

  // Footer
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    marginTop: "auto",
  },
  footerLoc: {
    fontSize: "12px",
    color: "#4a4844",
    letterSpacing: "0.04em",
  },
  footerLinks: {
    display: "flex",
    gap: "24px",
  },
  footerLink: {
    fontSize: "13px",
    color: "#7a7875",
    textDecoration: "none",
  },
};