import { Database, Server, ServerCog } from "lucide-react";

export const DATABASES = [
  {
    id: "sqlite",
    label: "SQLite",
    icone: Database,
    description: "Idéal pour tester",
    commande: "sqlite database.db",
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    icone: Server,
    description: "Idéal pour production",
    commande: "postgresql://localhost/",
  },
  {
    id: "mysql",
    label: "MySQL",
    icone: ServerCog,
    description: "Très répandu",
    commande: "mysql://localhost/",
  },
];

export const modeleBaseJwt = {
  nom: "User",
  attributs: [
    { nom: "email", type: "string", unique: true },
    { nom: "password", type: "string", nullable: false },
    { nom: "role", type: "string", default: "admin" },
  ],
  relations: [],
};
export const modeleJson = [
  {
    nom: "Utilisateur",
    attributs: [
      { nom: "nom", type: "string" },
      { nom: "email", type: "string", unique: true },
      { nom: "role", type: "string", default: "admin" },
    ],
    relations: [
      {
        type: "one_to_many",
        source: "Utilisateur",
        cible: "Publication",
        champ: "publications",
        attribut_inverse: "utilisateur",
      },
    ],
  },
  {
    nom: "Publication",
    attributs: [
      { nom: "titre", type: "string" },
      { nom: "contenu", type: "texte" },
      { nom: "date_creation", type: "date" },
      { nom: "is_public", type: "bool" },
    ],
  },
];

// ================= configuration jwt ================
// Access Token Expiry options
export const ACCESS_TOKEN_EXPIRY_OPTIONS = [
  { id: 1, label: "5 minutes", value: "5" },
  { id: 2, label: "15 minutes", value: "15" },
  { id: 3, label: "30 minutes", value: "30" },
  { id: 4, label: "1 heure", value: "60" },
  { id: 5, label: "2 heures", value: "120" },
  { id: 6, label: "6 heures", value: "360" },
  { id: 7, label: "12 heures", value: "720" },
  { id: 8, label: "1 jour", value: "1440" },
];

// Refresh Token Expiry options
export const REFRESH_TOKEN_EXPIRY_OPTIONS = [
  { id: 1, label: "1 jour", value: "1" },
  { id: 2, label: "7 jours", value: "7" },
  { id: 3, label: "14 jours", value: "14" },
  { id: 4, label: "30 jours", value: "30" },
  { id: 5, label: "60 jours", value: "60" },
  { id: 6, label: "90 jours", value: "90" },
];

// SameSite options
export const SAME_SITE_OPTIONS = [
  { id: 1, label: "Strict (sécurité maximale)", value: "Strict" },
  { id: 2, label: "Lax (recommandé)", value: "Lax" },
  { id: 3, label: "None (cross-site autorisé)", value: "None" },
];

// ================= STYLES =================
export const style = {
  border: "1px solid var(--border)",
  backgroundColor: "var(--bg-surface)",
};

export const style2 = {
  backgroundColor: "var(--bg-surface-2)",
  color: "var(--text-main)",
};
