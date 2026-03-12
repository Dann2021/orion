import { useState } from "react";

const steps = [
  { id: 1, label: "Informations" },
  { id: 2, label: "Équipe" },
  { id: 3, label: "Paramètres" },
];

const templates = [
  { id: "blank", icon: "◻", label: "Vide", desc: "Partir de zéro" },
  { id: "web", icon: "⬡", label: "Web App", desc: "Frontend + Backend" },
  { id: "api", icon: "⟨/⟩", label: "API REST", desc: "Service backend" },
  { id: "mobile", icon: "▭", label: "Mobile", desc: "iOS & Android" },
];

export default function CreateProject() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("blank");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [focused, setFocused] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      padding: "40px 20px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(99,102,241,0.3); }
        
        .card { 
          background: #111118; 
          border: 1px solid #1e1e2e;
          border-radius: 20px;
          width: 100%;
          max-width: 560px;
          padding: 40px;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.6);
        }

        .step-dot {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 600;
          transition: all 0.3s ease;
        }
        .step-dot.active {
          background: #6366f1;
          color: white;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.2);
        }
        .step-dot.done {
          background: rgba(99,102,241,0.15);
          color: #6366f1;
        }
        .step-dot.idle {
          background: #1e1e2e;
          color: #444;
        }
        .step-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, #6366f1 var(--pct, 0%), #1e1e2e var(--pct, 0%));
          transition: all 0.4s ease;
        }

        .template-card {
          border: 1px solid #1e1e2e;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          text-align: left;
        }
        .template-card:hover { border-color: #2e2e45; background: #13131f; }
        .template-card.active { border-color: #6366f1; background: rgba(99,102,241,0.06); }

        .field {
          width: 100%;
          background: #0d0d16;
          border: 1px solid #1e1e2e;
          border-radius: 10px;
          padding: 12px 14px;
          color: #e2e2f0;
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
          resize: none;
        }
        .field:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
        .field::placeholder { color: #333345; }

        .toggle-group {
          display: flex;
          background: #0d0d16;
          border: 1px solid #1e1e2e;
          border-radius: 10px;
          padding: 4px;
          gap: 4px;
        }
        .toggle-btn {
          flex: 1;
          padding: 8px;
          border-radius: 7px;
          border: none;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .toggle-btn.active { background: #6366f1; color: white; }
        .toggle-btn.idle { background: transparent; color: #555; }
        .toggle-btn.idle:hover { color: #999; }

        .btn-primary {
          width: 100%;
          padding: 13px;
          background: #6366f1;
          border: none;
          border-radius: 10px;
          color: white;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover { background: #5254cc; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.3); }
        .btn-primary:active { transform: translateY(0); }
        .btn-primary:disabled { opacity: 0.35; cursor: not-allowed; transform: none; box-shadow: none; }

        .btn-ghost {
          padding: 10px 16px;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: #555;
          font-family: inherit;
          font-size: 13px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .btn-ghost:hover { color: #aaa; }

        .tag {
          display: inline-flex; align-items: center;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          color: #a5b4fc;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: 500;
          font-family: 'DM Mono', monospace;
        }

        .fade-in { animation: fadeIn 0.3s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="card">
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ color: "#6366f1", fontSize: 18 }}>◈</span>
            <span style={{ color: "#555", fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>NOUVEAU PROJET</span>
          </div>
          <h1 style={{ color: "#e2e2f0", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {step === 1 ? "Choisissez un point de départ" : step === 2 ? "Nommez votre projet" : "Derniers réglages"}
          </h1>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 36 }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div className={`step-dot ${step === s.id ? "active" : step > s.id ? "done" : "idle"}`}>
                  {step > s.id ? "✓" : s.id}
                </div>
                <span style={{ fontSize: 10, color: step >= s.id ? "#6366f1" : "#333", fontWeight: 500, whiteSpace: "nowrap" }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="step-line" style={{ "--pct": step > s.id ? "100%" : "0%", margin: "0 8px", marginBottom: 14 }} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 — Templates */}
        {step === 1 && (
          <div className="fade-in">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
              {templates.map(t => (
                <button
                  key={t.id}
                  className={`template-card ${selected === t.id ? "active" : ""}`}
                  onClick={() => setSelected(t.id)}
                >
                  <div style={{ fontSize: 22, marginBottom: 8, color: selected === t.id ? "#6366f1" : "#333" }}>{t.icon}</div>
                  <div style={{ color: "#e2e2f0", fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{t.label}</div>
                  <div style={{ color: "#444", fontSize: 12 }}>{t.desc}</div>
                </button>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setStep(2)}>Continuer →</button>
          </div>
        )}

        {/* Step 2 — Name & Description */}
        {step === 2 && (
          <div className="fade-in">
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
              <div>
                <label style={{ display: "block", color: "#555", fontSize: 12, fontWeight: 500, marginBottom: 8, letterSpacing: "0.04em" }}>NOM DU PROJET</label>
                <input
                  className="field"
                  placeholder="mon-projet"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label style={{ display: "block", color: "#555", fontSize: 12, fontWeight: 500, marginBottom: 8, letterSpacing: "0.04em" }}>DESCRIPTION <span style={{ color: "#333" }}>(optionnel)</span></label>
                <textarea
                  className="field"
                  placeholder="Décrivez brièvement votre projet..."
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  rows={3}
                />
              </div>
              {name && (
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ color: "#333", fontSize: 12 }}>Identifiant :</span>
                  <span className="tag">{name.toLowerCase().replace(/\s+/g, "-")}</span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-ghost" onClick={() => setStep(1)}>← Retour</button>
              <button className="btn-primary" disabled={!name.trim()} onClick={() => setStep(3)}>Continuer →</button>
            </div>
          </div>
        )}

        {/* Step 3 — Settings */}
        {step === 3 && (
          <div className="fade-in">
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 28 }}>
              <div>
                <label style={{ display: "block", color: "#555", fontSize: 12, fontWeight: 500, marginBottom: 8, letterSpacing: "0.04em" }}>VISIBILITÉ</label>
                <div className="toggle-group">
                  {["private", "team", "public"].map(v => (
                    <button key={v} className={`toggle-btn ${visibility === v ? "active" : "idle"}`} onClick={() => setVisibility(v)}>
                      {v === "private" ? "🔒 Privé" : v === "team" ? "👥 Équipe" : "🌍 Public"}
                    </button>
                  ))}
                </div>
                <p style={{ color: "#333", fontSize: 12, marginTop: 8 }}>
                  {visibility === "private" ? "Seul vous avez accès." : visibility === "team" ? "Visible par les membres de l'équipe." : "Visible par tout le monde."}
                </p>
              </div>

              <div style={{ background: "#0d0d16", border: "1px solid #1e1e2e", borderRadius: 12, padding: 16 }}>
                <div style={{ color: "#666", fontSize: 12, marginBottom: 12, fontWeight: 500, letterSpacing: "0.04em" }}>RÉCAPITULATIF</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    ["Template", templates.find(t => t.id === selected)?.label],
                    ["Nom", name],
                    ["Visibilité", visibility],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#444", fontSize: 13 }}>{k}</span>
                      <span style={{ color: "#a5b4fc", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-ghost" onClick={() => setStep(2)}>← Retour</button>
              <button className="btn-primary">✦ Créer le projet</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}