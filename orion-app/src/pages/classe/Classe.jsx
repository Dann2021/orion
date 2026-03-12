import { AnimatePresence, motion } from "framer-motion";
import {
  Braces,
  CircleAlert,
  HelpCircleIcon,
  SettingsIcon
} from "lucide-react";
import { useState } from "react";
import { baseModele, baseProjet, baseUrl } from "../../api/api";
import { Bloc, Card, Col } from "../../composants";
import BtnCol from "../../composants/BtnCol";
import Selecteur from "../../composants/Selecteur";
import usePostData from "../../hooks/new/usePostData";
import useDataGet from "../../hooks/useDataGet";
import {
  ACCESS_TOKEN_EXPIRY_OPTIONS,
  DATABASES,
  modeleBaseJwt,
  modeleJson,
  REFRESH_TOKEN_EXPIRY_OPTIONS,
  SAME_SITE_OPTIONS,
  style,
  style2,
} from "./constantes";
import CardDatabaseChoix from "./elements/CardDatabaseChoix";
import JsonEditeurClasse from "./elements/JsonEditeurClasse";
import LogStatus from "./elements/LogStatus";
import TagModele from "./elements/TagModele";

// ================= COMPONENT =================
export default function Classe() {
  // ============== DATA CLASSE ================

  // import du hooks useDataGet
  const { data } = useDataGet(`${baseUrl}${baseProjet}/`);

  const projets = data?.data ?? [];

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

  // import du hooks

  const {
    postData: generateProject,
    success: generateSuccess,
    error: generateError,
  } = usePostData();

  const { postData: saveConfig, error: configError } = usePostData();
  const handleGenerateAndSave = async (e) => {
    e.preventDefault();

    if (!projetId) {
      alert("Veuillez sélectionner un projet");
      return;
    }

    if (jsonError) {
      alert("JSON invalide");
      return;
    }

    const dataSend = {
      modele: schema,
      databaseConfig: {
        type: selectedDb,
        ...dbConfig,
      },
      auth: activeSession
        ? { type: "session" }
        : jwtSession
          ? {
              type: "jwt",
              classe: modeleBaseJwt,
              configJwt: {
                access_token: accesToken,
                refresh_token: refreshToken,
                same_site: sameSite,
                token_storage: tokenStorage,
                jwt_security: jwtSecurity,
              },
            }
          : null,
    };

    try {
      setIsActive(true);

      // 1️⃣ Génération
      await generateProject(
        `${baseUrl}${baseProjet}/generate/${projetId}`,
        dataSend,
      );

      // 2️⃣ Sauvegarde configuration
      await saveConfig(`${baseUrl}${baseModele}/${projetId}`, {
        config: dataSend,
      });
    } catch (err) {
      console.error("Erreur globale :", err);
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
  const [jwtSession, setJwtSession] = useState(false);
  const toggleJwtSession = () => setJwtSession(!jwtSession);

  // configuration supplémentaire jwt
  const [accesToken, setAccesToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [sameSite, setSameSite] = useState(null);

  const [jwtSecurity, setJwtSecurity] = useState({
    secure: false,
    httponly: true,
  });

  const [tokenStorage, setTokenStorage] = useState({
    headers: true,
    cookie: false,
  });

  const handleJwtSecurity = (e) => {
    const { name, checked } = e.target;
    setJwtSecurity((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleTokenStorageChange = (e) => {
    const { name, checked } = e.target;
    setTokenStorage((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <Col className="gap-5">
      <h1 className="inter">Modeles</h1>
  
      
      <p className="mb-2" style={{ color: "var(--text-muted)"}}>Concevez et gérez l’architecture des données de votre application.</p>
      {/* Toggle JSON */}
      <div
        className="aff-flex jc-sb ai-mil gap-3 bloc-myn-10 bloc-11"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Selecteur
          value={projetId || ""}
          onChange={(e) => setProjetId(Number(e.target.value))}
          className={"bloc-myn-4 bloc-pt-4 bloc-11 p-myn-2"}
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
                  whileHover={{ scale: 1.01 }}
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
        {/** Ajout d'une configuration pour les jwt */}
        <AnimatePresence mode="wait">
          {jwtSession ? (
            <motion.div
              className="mh-2 p-1 ronde-1 token-card"
              //style={{ background: "var(--bg-main)"}}
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 200 }}
              transition={{ duration: 0.4, ease: "easeIn" }}
            >
              <div className="aff-flex ai-mil gap-3">
                <h3>Configuration Token </h3>
                <SettingsIcon size={20} />
              </div>
              <div className="aff-flex fd-col fd-myn-ligne jc-myn-sb p-1">
                <div className="aff-flex fd-col mh-1 gap-3 p-1">
                  <div className="aff-flex ai-mil gap-2">
                    <h4>Acces Token Expiry</h4>
                    <CircleAlert size={20} />
                  </div>
                  <Selecteur
                    value={accesToken || ""}
                    onChange={(e) => setAccesToken(e.target.value)}
                    className={"bloc-12"}
                    style={style2}
                  >
                    <option className="taille-pt" value="">
                      Choisir une durée
                    </option>
                    {ACCESS_TOKEN_EXPIRY_OPTIONS.map((element) => (
                      <option key={element.id} value={element.value}>
                        {element.label}
                      </option>
                    ))}
                  </Selecteur>
                  <div className="aff-flex fd-col mh-1 gap-2">
                    <h4>Token Storage</h4>
                    <div className="aff-flex fd-col gap-2">
                      <div className="gap-2 aff-flex">
                        <input
                          type="checkbox"
                          name="headers"
                          checked={tokenStorage.headers}
                          onChange={handleTokenStorageChange}
                        />
                        <label htmlFor="checkHeaders" className="te-noir">
                          Headers
                        </label>
                      </div>

                      <div className="gap-2 aff-flex">
                        <input
                          type="checkbox"
                          name="cookie"
                          checked={tokenStorage.cookie}
                          onChange={handleTokenStorageChange}
                        />
                        <label htmlFor="checkHeaders" className="te-noir">
                          Cookie (HTTP Only)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="aff-flex fd-col mh-1 gap-3 p-1">
                  <div className="aff-flex ai-mil gap-2">
                    <h4>Refresh Token Expiry</h4>
                    <CircleAlert size={20} />
                  </div>

                  <Selecteur
                    value={refreshToken || ""}
                    onChange={(e) => setRefreshToken(e.target.value)}
                    className={"bloc-12"}
                    style={style2}
                  >
                    <option className="taille-pt" value="">
                      Choisir une durée
                    </option>

                    {REFRESH_TOKEN_EXPIRY_OPTIONS.map((element) => (
                      <option key={element.id} value={element.value}>
                        {element.label}
                      </option>
                    ))}
                  </Selecteur>

                  <div className="aff-flex fd-col mh-1 gap-2">
                    <div className="aff-flex fd-col">
                      <div className="gap-2 aff-flex">
                        <input
                          type="checkbox"
                          name="httponly"
                          checked={jwtSecurity.httponly}
                          onChange={handleJwtSecurity}
                        />
                        <label htmlFor="checkHeaders" className="te-noir">
                          HttpOnly
                        </label>
                      </div>

                      <div className="gap-2 aff-flex">
                        <input
                          type="checkbox"
                          name="secure"
                          checked={jwtSecurity.secure}
                          onChange={handleJwtSecurity}
                        />
                        <label htmlFor="checkHeaders" className="te-noir">
                          Secure
                        </label>
                      </div>
                      <div className="gap-2 aff-flex ai-mil">
                        <span>SameSite</span>
                        <Selecteur
                          value={sameSite || ""}
                          onChange={(e) => setSameSite(e.target.value)}
                          className={"bloc-12"}
                          style={style2}
                        >
                          <option className="taille-pt" value="">
                            Choisir une option
                          </option>

                          {SAME_SITE_OPTIONS.map((element) => (
                            <option key={element.id} value={element.value}>
                              {element.label}
                            </option>
                          ))}
                        </Selecteur>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Bloc>

      {/** CARD DE CHOIX  POUR BASE DE DONNée */}

      <CardDatabaseChoix
        DATABASES={DATABASES}
        selectedDb={selectedDb}
        setSelectedDb={setSelectedDb}
        dbConfig={dbConfig}
        setDbConfig={setDbConfig}
        style={style}
        style2={style2}
      />

      {/* JSON EDITOR */}
      <JsonEditeurClasse
        style={style}
        jsonValue={jsonValue}
        handleJsonChange={handleJsonChange}
        handleGenerateAndSave={handleGenerateAndSave}
        jsonError={jsonError}
        isActive={isActive}
        nomProjet={nomProjet}
        downloadBackend={downloadBackend}
        estModifiable={estModifiable}
      />
      {/* LOG / STATUS */}
      <LogStatus
        style={style}
        generateSuccess={generateSuccess}
        generateError={generateError}
        configError={configError}
        jsonError={jsonError}
      />
    </Col>
  );
}
