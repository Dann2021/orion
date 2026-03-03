import {
  Activity,
  Code2Icon,
  Edit2Icon,
  Folder,
  Hammer,
  LayoutDashboardIcon,
  MoreHorizontal,
  SettingsIcon,
  User2Icon
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseProjet, baseUrl } from "../../api/api";
import { Bloc, Bouton, Card, Col, Input, Spinner } from "../../composants";
import Selecteur from "../../composants/Selecteur";
import useDataGet from "../../hooks/useDataGet";
import useDataPost from "../../hooks/useDataPost";
const style = {
  
  border: "2px solid var(--border)",
 
};

const style2 = {
  backgroundColor: "var(--bg-surface-2)",
  color: "var(--text-main)",
};

const style3 = {
  border: "1px solid var(--border)",
  backgroundColor: "var(--bg-surface)",
};

const data = [
  { id: 1, langage: "python", label: "Python" },
  { id: 2, langage: "javascript", label: "Javascript" },

];
export default function Dashboard() {

  // import de useNavigate
  const redirection = useNavigate()
  // state pour recuperer les valeurs des inputs

  const [nomProjet, setNomProjet] = useState("");
  const [auteur, setAuteur] = useState("");
  const [selectLangage, setSelectLangage] = useState(null)

  // import du hooks useDataPost
  const { loading, postData, success } = useDataPost(
    `${baseUrl}${baseProjet}/`,
  );

  // import du hooks useDataGet
  const { data: dataProjet, loading: isLoader } = useDataGet(
    `${baseUrl}${baseProjet}/`,
  );

  //const projets = data?.projets;

  const total = dataProjet?.meta?.total;

  // creation de la fonction pour envoyer les donnees du formulaire
  const handleSubmit = async (e) => {
    // annulation du comportement par défaut
    // ce comportement reactualisait la page après chaque soummission
    e.preventDefault();

    // creation de la variable dico {} pour transmettre les donnees
    const data = { nom: nomProjet, auteur: auteur, langage: selectLangage };
    await postData(data);
    setNomProjet("");
    setAuteur("");
    setSelectLangage("")
  };

  return (
    <Col className={"gap-5 bloc-myn-12"}>
      <h1>Dashboard</h1>

      <div
        className="aff-flex fd-col fd-pt-ligne fd-myn-ligne gap-5 jc-myn-sb bloc-myn-10 mb-3"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Card
        onClick={() => redirection("/projets") }
          className={"bloc-myn-4 bloc-pt-4 survol curseur-pointeur card-dash"}
          style={style3}
        >
          <Card.Header className={"aff-flex jc-sb ai-mil mb-2"}>
            <LayoutDashboardIcon />

            <div className="tag">
              <span className="tag-dot"></span>
              <span>Projets</span>
            </div>
          </Card.Header>

          <Card.Corps>
            {isLoader ? (
              <Spinner type={1} taille={20} />
            ) : total === 0 ? (
              <p
                className="ta-mil taille-pt"
                style={{ color: "var(--text-muted)" }}
              >
                Aucun projet pour le moment
              </p>
            ) : (
              <>
                <h2>{total}</h2>
                <h4
                  className="taille-pt"
                  style={{ color: "var(--text-muted)" }}
                >
                  Projet(s) réalisé(s)
                </h4>
              </>
            )}
          </Card.Corps>
        </Card>
        <Card
          className={"bloc-myn-4 bloc-pt-4 survol curseur-pointeur card-dash"}
          style={style3}
        >
          <Card.Header className={"aff-flex jc-sb ai-mil"}>
            <Code2Icon />
            <div className="tag">
              <span className="tag-dot"></span>
              <span style={{ color: "var(--success)" }}>API</span>
            </div>
          </Card.Header>
        </Card>
        <Card
          className={"bloc-myn-4 bloc-pt-4 survol curseur-pointeur card-dash"}
          style={style3}
        >
          <Card.Header className={"aff-flex jc-sb ai-mil"}>
            <Activity />
            <div className="tag">
              <span className="tag-dot"></span>
              <span>Activité</span>
            </div>
          </Card.Header>
        </Card>
      </div>

      <h4 style={{ color: "var(--text-muted)" }}>Créez un nouveau projet</h4>
      <Card className={"ronde-1 p-2 bloc-myn-10"} style={style3}>
        <Card.Header
          style={{ borderBottom: "1px solid var(--border)" }}
          className={"aff-flex jc-sb ai-mil gap-3 mb-2 p-1 "}
        >
          <div className="aff-flex jc-sb gap-3 ai-mil">
            <SettingsIcon size={20} style={{ color: "var(--primary)" }} />
            <h3 className="inter">Configuration du projet</h3>
          </div>

          <Bouton
            onClick={() => alert("Fonctionnalité à venir")}
            theme="sombre"
            taille={"min"}
            className={"ronde"}
          >
            <MoreHorizontal size={20} />
          </Bouton>
        </Card.Header>
        <Card.Corps
          className={"aff-flex ai-mil fd-col gap-5 p-myn-5 py-3 ronde"}
        >
          <Input
            classNameSurcharge={"bloc-myn-8 bloc-12 mb-3 p-2"}
            placeholder={"Saisir un nom"}
            label={"Nom du projet"}
            simple
            value={nomProjet}
            onChange={(e) => setNomProjet(e.target.value)}
            dataType={"arrondie"}
          >
            <Edit2Icon className="iconeElement" />
          </Input>

          <Selecteur value={selectLangage || ''} onChange={(e) => setSelectLangage(e.target.value)} className={"bloc-myn-8 bloc-12 p-2 mb-3"} style={style2}>
            <option className="taille-pt" value="">
              Choisir une version
            </option>
            {data.map((element) => (
              <option key={element.id} value={element.langage}>
                {element.label}
              </option>
            ))}
          </Selecteur>

          <Input
            classNameSurcharge={"bloc-myn-8 bloc-12 p-2"}
            placeholder={"Saisir le nom de l'auteur"}
            label={"Auteur"}
            simple
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            dataType={"arrondie"}
          >
            <User2Icon className="iconeElement" />
          </Input>
        </Card.Corps>

        <Card.Bas className={"mh-5 aff-flex  jc-fin"}>
          <Bouton
            onClick={handleSubmit}
            theme="sombre"
            className={"ronde-1 bouton-icone"}
          >
            <Hammer size={20} />
            Générez
            {loading && <Spinner type={1} taille={20} />}
          </Bouton>
        </Card.Bas>
      </Card>

     

      <Bloc style={style} type={"myn"} nombre={10} className={"ronde-1 p-2"}>
        <div className="aff-flex  ai-mil gap-3">
          <Activity />
          <h1>Log</h1>
        </div>

        <ul className="lst-aucun mh-3">
          {success ? (
            <>
              <li className="aff-flex ai-mil  gap-3">
                <span className="tag-dot-2"></span>
                <div className="aff-flex ai-mil gap-3 ">
                  <span> Génération du projet </span>
                  [<Folder className="couleur-vert-sauge" size={16} />{" "}
                  <span className="couleur-vert-sauge">{success?.data?.nom}</span>]
                </div>
              </li>

              <li className="aff-flex ai-mil gap-3">
                <span className="tag-dot-2"></span>
                <span>
                  <span className="couleur-vert-sauge">
                    {success?.status}
                  </span>{" "}
                </span>
              </li>
            </>
          ) : (
            <li className="aff-flex ai-mil gap-3">
              <span className="tag-dot-2"></span>
              <span>Aucune action pour l'instant</span>
            </li>
          )}
        </ul>
      </Bloc>
    </Col>
  );
}
