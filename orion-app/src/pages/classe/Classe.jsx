import { AnimatePresence, motion } from "framer-motion";
import {
  ActivityIcon,
  Braces,
  CheckCircle2Icon,
  Download,
  HelpCircleIcon,
} from "lucide-react";
import { useState } from "react";
import { baseProjet, baseUrl } from "../../api/api";
import { Bloc, Bouton, Card, Col, Input, Ligne } from "../../composants";
import BtnCol from "../../composants/BtnCol";
import JsonEditor from "../../composants/JsonEditor";
import Selecteur from "../../composants/Selecteur";
import useDataGet from "../../hooks/useDataGet";
import useDataPost from "../../hooks/useDataPost";
import { DATABASES, modeleJson, style, style2 } from "./constantes";

// ================= COMPONENT =================
export default function Classe() {
  // ============== DATA CLASSE ================

  // import du hooks useDataGet
  const { data } = useDataGet(`${baseUrl}${baseProjet}/`);

  const projets = data?.projets ?? [];

  // ========================================
  const [estModifiable, setEstModifiable] = useState(false);
  const handleModifiable = () => setEstModifiable(!estModifiable);

  // ========== JSON SCHEMA (source de vérité) ==========
  const [schema, setSchema] = useState(modeleJson);

  // ==========  State pour selectionner une base de donnée ============
  const [selectedDb, setSelectedDb] = useState("sqlite");

  // ============== STATE pour configuration de la base de donnée ==============
  const [dbConfig, setDbConfig] = useState({
    host: "",
    port: "",
    database: "",
    username: "admin",
    password: "admin",
  });

  // ==========  State pour récupérer le id du projet ============
  const [projetId, setProjetId] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // ========== JSON EDITOR STATE ==========
  const [jsonValue, setJsonValue] = useState(JSON.stringify(schema, null, 2));
  const [jsonError, setJsonError] = useState(null);

  // import du hooks
  const { postData, success } = useDataPost(
    `${baseUrl}${baseProjet}/generate/${projetId}`,
  );
  // ========== JSON HANDLER ==========
  const handleJsonChange = (value) => {
    setJsonValue(value);

    try {
      const parsed = JSON.parse(value);
      setSchema(parsed);
      setJsonError(null);
    } catch {
      setJsonError("JSON invalide");
      setSchema([]); // optionnel : vider schema si JSON invalide
    }
  };
  const handleTestSubmit = async (e) => {
    e.preventDefault();

    const dataSend = {
      modele: schema,
      databaseConfig: {
        type: selectedDb,
        ...dbConfig,
      },
      session: activeSession,
      jwt: jwtSession
    };

    // console.log("Données envoyées au backend :", dataSend);

    // on met à jour le isActive pour afficher activer le bouton de téléchargement
    setIsActive(true);

    await postData(dataSend);
    if (!projetId) {
      alert("Veuillez sélectionner un projet");
      return;
    }

    if (jsonError) {
      alert("JSON invalide");
      return;
    }
  };

  // recuperation du nom du projet pour le download
  const projetSelectionne = projets.find((projet) => projet.id === projetId);
  const nomProjet = projetSelectionne ? projetSelectionne.nom : null;

  const downloadBackend = (projectName) => {
    window.location.href = `${baseUrl}download/${projectName}`;
  };

  // ================= State pour les sessions =================
  const [activeSession, setActiveSession] = useState(false);
  const toggleSession = () => {
    setActiveSession(!activeSession);
  };


  // ================ State pour les jwt ==================
  const [jwtSession, setJwtSession] = useState(false)
  const toggleJwtSession = () => setJwtSession(!jwtSession)

  return (
    <Col className="gap-5">
      <h1 className="inter">Classes</h1>

      {/* Toggle JSON */}
      <div className="aff-flex jc-sb ai-mil gap-3 bloc-myn-10 bloc-11">
        <Selecteur
          value={projetId || ""}
          onChange={(e) => setProjetId(Number(e.target.value))}
          className={"bloc-myn-4 bloc-11 p-2"}
          style={style2}
        >
          <option className="taille-pt" value="">
            Choisir un projet
          </option>
          {projets &&
            projets.map((element) => (
              <option key={element.id} value={element.id}>
                {element.nom}
              </option>
            ))}
        </Selecteur>
        <div className="aff-flex jc-sb ai-mil gap-2">
          <div className="tag">
            <p className="taille">Editer</p>
          </div>
          <BtnCol
            classeName={"curseur-pointeur"}
            onClick={handleModifiable}
            type="rond"
          />
        </div>
      </div>

      {/* FORM 1 */}
      <Card style={style} className="ronde-1 p-2 bloc-myn-10">
        <Card.Corps className="m-5 aff-flex ai-mil fd-col gap-5">
          <Braces size={50} className="couleur-rouge-cerise" />

          <AnimatePresence>
            <motion.div layout className="aff-flex jc-mil fw-wrap gap-3">
              {schema.map((element) => (
                <TagModele
                  key={element.nom}
                  as={motion.div}
                  nom={element.nom}
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.25 }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </Card.Corps>
      </Card>

      {/** CONFIGURATION SUPPLEMENTAIRE */}
      <Bloc className={"ronde p-2"} style={style} type={"myn"} nombre={10}>
        <div className="aff-flex gap-2 ai-mil">
          <h3>Gestion des sessions</h3>
          <HelpCircleIcon />
        </div>

        <div className="aff-flex fd-col mh-5 gap-3">
          <div className="aff-flex jc-sb ai-mil mb-2">
            <span className="te-noir tag">Session (Flask)</span>
            <BtnCol
              classeName={"curseur-pointeur"}
              onClick={toggleSession}
              type={"rond"}
            />
          </div>
          <div className="aff-flex jc-sb ai-mil">
            <span className="te-noir tt-maj tag">jwt_extended</span>
            <BtnCol
              classeName={"curseur-pointeur"}
              onClick={toggleJwtSession}
              type={"rond"}
            />
          </div>
        </div>
      </Bloc>

      {/** CARD DE CHOIX  POUR BASE DE DONNée */}
      <Bloc className={"ronde p-2"} style={style} type={"myn"} nombre={10}>
        <h3>Base de données</h3>
        <Ligne className={"jc-mil p-1 mb-2"}>
          {DATABASES.map((db) => (
            <CardDatabase
              key={db.id}
              icone={db.icone}
              label={db.label}
              commande={db.commande}
              description={db.description}
              className={`db-card ${selectedDb === db.id ? "active" : ""}`}
              onClick={() => setSelectedDb(db.id)}
            />
          ))}
        </Ligne>

        <AnimatePresence mode="wait">
          {selectedDb !== "sqlite" && (
            <Card
              as={motion.form}
              key="db-form"
              initial={{ opacity: 0, y: -100 }} // 🔽 vient du haut
              animate={{ opacity: 1, y: 0 }} // centre
              exit={{ opacity: 0, y: 100 }} // 🔼 part vers le bas
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card.Corps className="ligne jc-mil gap-6">
                <Input
                  classNameSurcharge="bloc-myn-3 bloc-12 mb-2 bloc-pt-10"
                  dataType="arrondie"
                  simple
                  value={dbConfig.host}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, host: e.target.value })
                  }
                  placeholder="Hôte"
                  label="Hôte"
                />
                <Input
                  classNameSurcharge="bloc-myn-3 bloc-12 mb-2 bloc-pt-10"
                  dataType="arrondie"
                  simple
                  value={dbConfig.port}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, port: e.target.value })
                  }
                  placeholder="5432"
                  label="Port"
                />
                <Input
                  classNameSurcharge="bloc-myn-3 bloc-12 mb-2 bloc-pt-10"
                  dataType="arrondie"
                  simple
                  value={dbConfig.database}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, database: e.target.value })
                  }
                  placeholder="Nom de la base de donnée"
                  label="Base de donnée"
                />
              </Card.Corps>
            </Card>
          )}
        </AnimatePresence>
      </Bloc>

      {/* JSON EDITOR */}

      <Card
        as={motion.pre}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
        style={style}
        className="ronde-1 p-2 bloc-myn-10 json-preview"
      >
        <Card.Header>
          <h2>Format JSON</h2>
        </Card.Header>

        <Card.Corps className="p-1">
          <JsonEditor
            editer={!estModifiable}
            value={jsonValue}
            onChange={handleJsonChange}
          />

          {jsonError && (
            <p className="couleur-rouge-cerise mh-2">{jsonError}</p>
          )}
        </Card.Corps>

        <Card.Bas className="mh-2 aff-flex jc-fin gap-5">
          <Bouton onClick={handleTestSubmit} theme="prime" className="ronde-1">
            Générer
          </Bouton>

          {isActive && (
            <Bouton
              theme="sombre"
              className={"bouton-icone ronde-1"}
              onClick={() => downloadBackend(nomProjet)}
            >
              <Download size={16} className="ml-1" />
              Télécharger
            </Bouton>
          )}
        </Card.Bas>
      </Card>

      {/* LOG / STATUS */}
      <Bloc style={style} type="myn" nombre={10} className="ronde-1 p-2">
        <div className="aff-flex  ai-mil gap-3">
          <ActivityIcon />

          <h1>Log</h1>
        </div>
        <ul className="lst-aucun">
          {success && (
            <motion.li
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              className="aff-flex ai-mil gap-3 mh-1"
            >
              <span className="tag-dot-2 bg-vert-sauge"></span>
              <span className="couleur-vert-sauge">{success.message}</span>
            </motion.li>
          )}
          {jsonError && (
            <motion.li
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              className="aff-flex ai-mil gap-3 mh-1"
            >
              <span className="tag-dot-2 bg-rouge-cerise"></span>
              <span className="couleur-rouge-cerise">{jsonError}</span>
            </motion.li>
          )}
        </ul>
      </Bloc>
    </Col>
  );
}

// eslint-disable-next-line no-unused-vars
const TagModele = ({ nom, as: Component = "div", ...props }) => {
  return (
    <Component
      {...props}
      className="aff-flex jc-sb gap-1 survol curseur-pointeur"
    >
      <pre className="tag">
        <span className="tag-dot-2"></span>
        <code>{nom}</code>
      </pre>
    </Component>
  );
};

const CardDatabase = ({
  icone: Icone,
  label,
  commande,
  description,
  onClick,
  className = "",
}) => {
  return (
    <Card
      className={"bloc-myn-3 bloc-pt-4 curseur-pointeur survol " + className}
      style={style2}
      onClick={onClick}
    >
      <Card.Header className={"aff-flex ai-mil gap-3 mb-2"}>
        {Icone && <Icone size={20} />}
        <h4 className="fira"> {label}</h4>
      </Card.Header>
      <Card.Corps className={"mb-1"}>
        <h5 className="fira">{commande}</h5>
      </Card.Corps>
      <Card.Bas className={"aff-flex ai-mil gap-2"}>
        <CheckCircle2Icon size={16} />
        <p className="taille-pt">{description}</p>
      </Card.Bas>
    </Card>
  );
};
