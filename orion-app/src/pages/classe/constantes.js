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
    nom: "Projet",
    attributs: [
      { nom: "nom", unique: true, type: "string" },
      { nom: "prenom", unique: true, type: "string" },
      { nom: "age", unique: true, type: "integer" },
      { nom: "date", unique: true, type: "date" },
    ],
    relations: [
      {
        type: "one_to_many",
        source: "Projet",
        cible: "Classe",
        champ: "classes",
        attribut_inverse: "projet",
      },
    ],
  },
  {
    nom: "Classe",
    attributs: [
      { nom: "age", unique: true, type: "integer" },
      { nom: "enVie", unique: true, type: "bool" },
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
