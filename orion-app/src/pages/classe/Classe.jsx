import { AnimatePresence, motion } from "framer-motion";
import {
  ActivityIcon,
  Braces
} from "lucide-react";
import { useState } from "react";
import { baseProjet, baseUrl } from "../../api/api";
import { Bloc, Bouton, Card, Col } from "../../composants";
import BtnCol from "../../composants/BtnCol";
import JsonEditor from "../../composants/JsonEditor";
import Selecteur from "../../composants/Selecteur";
import useDataGet from "../../hooks/useDataGet";
import useDataPost from "../../hooks/useDataPost";

// ================= STYLES =================
const style = {
  border: "1px solid var(--border)",
  backgroundColor: "var(--bg-surface)",
};

const style2 = {
  backgroundColor: "var(--bg-surface-2)",
  color: "var(--text-main)",
};

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
  const [schema, setSchema] = useState([
    {
      nom: "Projet",
      attributs: {
        nom: "String",
        auteur: "String",
        age: "Integer",

      },
      relations: [
      {
                type: "one_to_many",
                source: "Projet",
                cible: "Classe",
                champ: "classes",
                attribut_inverse: "projet",
                nullable: false,
            },]
    },

    {
      nom: "Classe",
      attributs: {
        nom: "String",
        prix : "Float",
      },
    },

    {
      nom: "Attribut",
      attributs: {
        nom: "String",
        type: "String",
      },
    },
  ]);

  // ==========  State pour récupérer le id du projet ============
  const [projetId, setProjetId] = useState(null);

  // ========== JSON EDITOR STATE ==========
  const [jsonValue, setJsonValue] = useState(JSON.stringify(schema, null, 2));
  const [jsonError, setJsonError] = useState(null);

  // import du hooks
  const { postData, success } = useDataPost(
    `${baseUrl}${baseProjet}/generate/${projetId}`
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

    const dataSend = { modele: schema };

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

        <Card.Bas className="mh-2 aff-flex jc-fin">
          <Bouton onClick={handleTestSubmit} theme="prime" className="ronde-1">
            Générer
          </Bouton>
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
