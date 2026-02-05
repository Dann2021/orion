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

export const modeleJson = [
  {
    nom: "User",
    attributs: [
      {nom: "nom", type: "string" },
      {nom: "email", type: "string", unique:true},
      {nom:"role", type:"string", default:"user"}
    ],
    relations: [
      {
        type: "one_to_many",
        source: "User",
        cible: "Publication",
        champ: "publications",
        attribut_inverse: "user",
      },
    ],
  },
  {
    nom: "Publication",
    attributs: [
      { nom: "titre",  type: "string"},
      {nom: "contenu", type: "texte"},
      {nom: "date_creation", type: "date"},
      { nom: "is_public", type: "bool" },
    ],
  },
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
