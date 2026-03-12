import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs";

export default function Footer() {
  const styleSocialBtn = {
    width: "20px",
    height: "20px",
    fontWeight: 600,
    borderRadius: "8px",
  };

  return (
    <footer
      className="conteneur aff-flex fd-col fd-myn-ligne ai-mil jc-mil jc-myn-sb gap-4 aff-myn-none"
      style={{
        color: "var(--text-muted)",
        fontSize: "0.95rem",
      }}
    >
      <p>© 2026 Tous les droits réservés</p>
      <div className="aff-flex jc-mil  ai-mil gap-2">
        <BsGithub
          size={16}
          className="aff-inline-flex td-none jc-mil ai-mil"
          style={styleSocialBtn}
        />

        <BsDiscord
          size={16}
          className="aff-inline-flex td-none jc-mil ai-mil"
          style={styleSocialBtn}
        />
        <BsTwitterX
          size={16}
          className="aff-inline-flex td-none jc-mil ai-mil"
          style={styleSocialBtn}
        />
      </div>
    </footer>
  );
}
