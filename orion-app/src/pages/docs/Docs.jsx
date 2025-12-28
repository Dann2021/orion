import { Bloc, Col } from "../../composants";

const schema = [
  {
    nom: "Projet",
    attributs: {
      nom: "String",
      auteur: "String",
    },
  },

  {
    nom: "Classe",
    attributs: {
      nom: "String",
    },
  },

  {
    nom: "Attribut",
    attributs: {
      nom: "String",
      type: "String",
    },
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

      <JsonPreview schema={schema} />

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
          type <span className="couleur-rouge-cerise">string, integer, float, bool, date, texte, datetime et json</span>. Cela garantit que les
          données associées à chaque attribut sont correctement formatées et
          validées.
        </p>
      </Bloc>
    </Col>
  );
}

const JsonPreview = ({ schema }) => {
  return (
    <div
      className="mb-5 bloc-myn-10 bloc-12 p-3 ronde"
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }}
    >
      <h3>Modele de base</h3>
      <pre>{JSON.stringify(schema, null, 2)}</pre>
    </div>
  );
};
