import { Bloc, Bouton, Card, Col, Input } from "../../composants";
import {
  Braces,
  Code,
  Edit2Icon,
  Key,
  Layers,
  Tag,
  Trash,
  Type,
  User2Icon,
} from "lucide-react";
import BtnCol from "../../composants/BtnCol";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Selecteur from "../../composants/Selecteur";
import axios from "axios";
import { baseUrl } from "../../api/api";

// ================= STYLES =================
const style = {
  border: "1px solid var(--border)",
};

const style2 = {
  backgroundColor: "var(--bg-surface-2)",
  color: "var(--text-main)",
};
const data = [
  { id: 1, nom: "Integer" },
  { id: 2, nom: "Float" },
  { id: 3, nom: "Boolean" },
  { id: 4, nom: "Date" },
  { id: 5, nom: "String" },
];
// ================= COMPONENT =================
export default function Classe() {
  // ============== DATA CLASSE ================
  const [classeList, setClassList] = useState([]);
  const [valeur, setValeur] = useState("");

  // ajouter
  const handleAdd = () => {
    setClassList((prev) => [...prev, valeur]);
    setValeur("");
  };

  // supprimer
  const handleDelete = (item) =>
    setClassList((prev) => prev.filter((element) => element !== item));

  // ========================================
  const [active, setActive] = useState(false);
  const handleClick = () => setActive(!active);

  // ========== JSON SCHEMA (source de vérité) ==========
  const [schema, setSchema] = useState([{
    class: "User",
    table: "users",
    fields: [
      { name: "id", type: "Integer", primary_key: true },
      { name: "email", type: "String", unique: true },
      { name: "password", type: "String" },
    ],
  }, {
    class: "Orion",
    table: "orions",
    fields: [
      { name: "id", type: "Integer", primary_key: true },
      { name: "email", type: "String", unique: true },
      { name: "password", type: "String" },
    ],
  }]);

  // ========== JSON EDITOR STATE ==========
  const [jsonValue, setJsonValue] = useState(JSON.stringify(schema, null, 2));
  const [jsonError, setJsonError] = useState(null);

  // ========== JSON HANDLER ==========
  const handleJsonChange = (e) => {
    const value = e.target.value;
    setJsonValue(value);

    try {
      const parsed = JSON.parse(value);
      setSchema(parsed);
      setJsonError(null);
    } catch {
      setJsonError("JSON invalide");
    }
  };

  const handleTestSubmit =  async (e) => {

    // comportement par defaut
    e.preventDefault()

    const data = {json: schema}
    try {
      const rep = await axios.post(`${baseUrl}post-json`, data, {withCredentials: true})
      console.log("rep : ", rep.data)
    }catch(erreur){
      console.log("erreur", erreur)
    }
  }

  return (
    <Col className="gap-5">
      <h1 className="inter">Classes</h1>

      {/* Toggle JSON */}
      <div className="aff-flex jc-fin ai-mi bloc-myn-10 bloc-11">
        <div className="aff-flex jc-sb ai-mil gap-2">
          <div className="tag">
            <p>Activer le format JSON</p>
          </div>
          <BtnCol
            classeName={"curseur-pointeur"}
            onClick={handleClick}
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
                  key={element.class}
                  as={motion.div}
                  nom={element.class}
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => handleDelete(element)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </Card.Corps>
      </Card>

      {/* JSON EDITOR */}
      <AnimatePresence mode="wait">
        {active ? (
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
              <textarea
                value={jsonValue}
                onChange={handleJsonChange}
                className="json-editor"
                spellCheck={false}
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
        ) : (
          <Card
            as={motion.div}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            style={style}
            className="ronde-1 p-2 bloc-myn-10"
          >
            <Card.Corps className="mh-5">
              <div className="aff-flex fd-col ai-mil gap-6">
                <Input
                  classNameSurcharge="bloc-myn-8 bloc-11 p-2 mb-2"
                  placeholder="Saisir un nom"
                  label="Nom de la classe"
                  value={valeur}
                  onChange={(e) => setValeur(e.target.value)}
                  simple
                  dataType="arrondie"
                >
                  <Layers className="iconeElement" />
                </Input>
              </div>

              <div className="aff-flex gap-3 jc-mil ai-mil mh-3">
                <Input
                  classNameSurcharge="bloc-myn-6 p-2 bloc-8"
                  placeholder="Saisir un nom"
                  label="Nom attribut"
                  simple
                  dataType="arrondie"
                >
                  <Key className="iconeElement" />
                </Input>

                <Selecteur className={"p-2 bloc-myn-2 bloc-3"} style={style2}>
                  <option className="taille-pt" value="">
                    Type
                  </option>
                  {data.map((element) => (
                    <option key={element.id} value={element.nom}>
                      {element.nom}
                    </option>
                  ))}
                </Selecteur>
              </div>

              <div className="aff-flex fd-col ai-mil mh-2">
                <Bouton
                  onClick={handleAdd}
                  theme="sombre"
                  className={"ronde-1"}
                >
                  Ajouter un attribut
                </Bouton>
              </div>
            </Card.Corps>

            <Card.Bas className="mh-2 aff-flex jc-fin">
              <Bouton theme="prime" className="ronde-1">
                Générer
              </Bouton>
            </Card.Bas>
          </Card>
        )}
      </AnimatePresence>

      {/* LOG / STATUS */}
      <Bloc style={style} type="myn" nombre={10} className="ronde-1 p-2">
        <h1>Logs</h1>
        <ul className="lst-aucun">
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
const TagModele = ({ nom, onClick, as: Component = "div", ...props }) => {
  return (
    <Component
      {...props}
      className="aff-flex jc-sb gap-1 survol curseur-pointeur"
    >
      <pre className="tag">
        <code>{nom}</code>
      </pre>

      {/*<Bouton onClick={onClick} className="ronde-1" taille="min" theme="sombre">
        <Trash size={16} />
      </Bouton>*/}
    </Component>
  );
};




