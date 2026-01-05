import { Copy } from "lucide-react";
import { Bloc, Bouton, Col } from "../../composants";

const attrJson = {
  attributs: [
    {
      nom: "nom",
      type: "string",
      nullable: false,
      unique: true,
      index: false,
      default: null,
      primary_key: false,
    },
  
  ],
};

const relJson = {
  relations: [
    {
      source: "Modele source",
      type: "Type de relation",
      cible: "Modele cible",
      champ: "Champ de relation",
      attribut_inverse: "Champ inverse",
      nullable: "boolean",
    },
  ],
};
const schema = [
  {
    nom: "Projet",
    attributs: attrJson.attributs,
    relations: relJson.relations,
  },

  {
    nom: "Classe",
    attributs: [
      {
        nom: "String",
      },
    ],
  },
];

export default function Docs() {
  return (
    <Col>
      <h1 className="inter">Documentation</h1>
      <Bloc
        type={"myn"}
        nombre={10}
        className={"p-3 mh-4 mb-5 ronde bloc-11"}
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <p>
          Bienvenue dans la documentation de l'application Orion. Ici, vous
          trouverez des informations détaillées sur les fonctionnalités,
          l'utilisation et les meilleures pratiques pour tirer le meilleur parti
          de notre plateforme.
        </p>
      </Bloc>

      <div className="aff-flex jc-sb ai-mil gap-2">
        <div className="tag">
          <h3 className="taille">Dashboard</h3>
        </div>
      </div>

      <Bloc
        type={"myn"}
        nombre={10}
        className={"p-3 mh-4 mb-5 ronde bloc-11"}
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <p>
          Le tableau de bord est votre point de départ pour gérer vos projets.
          Vous pouvez créer de nouveaux projets.
        </p>
      </Bloc>

      <div className="aff-flex jc-sb ai-mil gap-2">
        <div className="tag">
          <h3 className="taille">Classes</h3>
        </div>
      </div>

      <Bloc
        type={"myn"}
        nombre={10}
        className={"p-3 mh-4 mb-5 ronde bloc-11"}
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <p>
          La section Classes vous permet de définir et de gérer les structures
          de données de votre projet. Vous pouvez ajouter, modifier et supprimer
          des classes selon vos besoins.
        </p>
      </Bloc>

      <JsonPreview titre={"Modèle de classe"} schema={schema} />

      <div className="aff-flex jc-sb ai-mil gap-2">
        <div className="tag">
          <h3 className="taille">Projets</h3>
        </div>
      </div>

      <Bloc
        type={"myn"}
        nombre={10}
        className={"p-3 mh-4 mb-5 ronde bloc-11"}
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <p>
          La section Projets affiche tous vos projets existants. Vous pouvez
          visualiser les détails de chaque projet et accéder rapidement aux
          fonctionnalités associées.
        </p>
      </Bloc>

      {/** ajout pour le type des attributs  */}
      <div className="aff-flex jc-sb ai-mil gap-2">
        <div className="tag">
          <h3 className="taille">Attributs</h3>
        </div>
      </div>

      <Bloc
        type={"myn"}
        nombre={10}
        className={"p-3 mh-4 mb-5 ronde bloc-11"}
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <p>
          La section Attributs affiche tous vos attributs existants. Lorsque
          vous creerez des attributs pour vos classes, vous devez spécifier leur
          type{" "}
          <span className="couleur-bleu-ciel te-noir fira">
            string, integer, float, bool, date, texte, datetime et json
          </span>
          . Cela garantit que les données associées à chaque attribut sont
          correctement formatées et validées.
        </p>
      </Bloc>
      <JsonPreview titre={"Modèle de base des attributs"} schema={attrJson} />

      {/** ajout pour les relations  */}
      <div className="aff-flex jc-sb ai-mil gap-2">
        <div className="tag">
          <h3 className="taille">Relations</h3>
        </div>
      </div>

      <Bloc
        type={"myn"}
        nombre={10}
        className={"p-3 mh-4 mb-5 ronde bloc-11"}
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <p>
          La section Relations vous permet de définir les connexions entre
          différentes classes. Vous pouvez créer des relations{" "}
          <span className="te-noir fira couleur-bleu-ciel">un-à-un</span>,{" "}
          <span className="te-noir fira couleur-bleu-ciel">un-à-plusieurs</span>{" "}
          et{" "}
          <span className="te-noir fira couleur-bleu-ciel">
            plusieurs-à-plusieurs
          </span>{" "}
          pour modéliser les interactions entre vos données.
        </p>
      </Bloc>
      <JsonPreview titre={"Modèle de base des relations"} schema={relJson} />
    </Col>
  );
}

const JsonPreview = ({ schema, titre }) => {
  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    alert("JSON copié dans le presse-papiers !");
  };
  return (
    <div
      className="mb-5 bloc-myn-10 bloc-12 p-3 ronde"
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="aff-flex jc-fin">
       <Bouton onClick={copy} taille={"min"} theme="sombre" className={"ronde-1 p-1"}>
        <Copy size={16} />
       </Bouton>
      </div>
      <h3>{titre}</h3>
      <pre className="taille-pt">{JSON.stringify(schema, null, 2)}</pre>
    </div>
  );
};

