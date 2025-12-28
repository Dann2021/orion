import { Edit2Icon, Folder, User2Icon } from "lucide-react";
import { useState } from "react";
import { baseProjet, baseUrl } from "../../api/api";
import { Bloc, Bouton, Card, Col, Input, Spinner } from "../../composants";
import Selecteur from "../../composants/Selecteur";
import useDataPost from "../../hooks/useDataPost";
const style = {
  border: "1px solid var(--border)",
};

const style2 = {
  backgroundColor: "var(--bg-surface-2)",
  color: "var(--text-main)",
};

const data = [
  { id: 1, nom: "python" },
  { id: 2, nom: "java" },
  { id: 3, nom: "html" },
];
export default function Dashboard() {
  // state pour recuperer les valeurs des inputs

  const [nomProjet, setNomProjet] = useState("");
  const [auteur, setAuteur] = useState("");

  // import du hooks useDataPost
  const { loading, postData, success } = useDataPost(
    `${baseUrl}${baseProjet}/`
  );

  // creation de la fonction pour envoyer les donnees du formulaire
  const handleSubmit = async (e) => {
    // annulation du comportement par défaut
    // ce comportement reactualisait la page après chaque soummission
    e.preventDefault();

    // creation de la variable dico {} pour transmettre les donnees
    const data = { nom: nomProjet, auteur: auteur };
    await postData(data);
    setNomProjet("");
    setAuteur("");
  };

  return (
    <Col className={"gap-5"}>
      <h1 className="inter">Dashboard</h1>

      <h2>Créez un nouveau projet</h2>

      <Card style={style} className={"ronde-1  p-2 bloc-myn-10"}>
        
        <Card.Corps className={"mh-5 aff-flex ai-mil fd-col gap-5"}>
          <Input
            classNameSurcharge={"bloc-myn-8 bloc-11 mb-5 p-2"}
            placeholder={"Saisir un nom"}
            label={"Nom du projet"}
            simple
            value={nomProjet}
            onChange={(e) => setNomProjet(e.target.value)}
            dataType={"arrondie"}
          >
            <Edit2Icon className="iconeElement" />
          </Input>

          <Selecteur className={"bloc-myn-8 bloc-11 p-2 mb-3"} style={style2}>
            <option className="taille-pt" value="">
              Choisir une version
            </option>
            {data.map((element) => (
              <option key={element.id} value={element.nom}>
                {element.nom}
              </option>
            ))}
          </Selecteur>

          <Input
            classNameSurcharge={"bloc-myn-8 bloc-11 p-2"}
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

        <Card.Bas className={"mh-5 aff-flex jc-fin"}>
          <Bouton
            onClick={handleSubmit}
            theme="sombre"
            className={"ronde-1 bouton-icone"}
          >
            Générez
            {loading && <Spinner type={1} taille={20} />}
          </Bouton>
        </Card.Bas>
      </Card>

      <Bloc style={style} type={"myn"} nombre={10} className={"ronde-1 p-2"}>
        <h1>Log</h1>
        <ul className="lst-aucun">
          {success ? (
            <>
              <li className="aff-flex ai-mil  gap-3">
                <span className="tag-dot-2"></span>
                <div className="aff-flex ai-mil gap-3 ">
                  <span> Génération du projet </span>
                  [<Folder className="couleur-vert-sauge" size={16} />{" "}
                  <span className="couleur-vert-sauge">{success?.nom}</span>]
                </div>
              </li>

              <li className="aff-flex ai-mil gap-3">
                <span className="tag-dot-2"></span>
                <span>
                  <span className="couleur-vert-sauge">
                    {success?.message}
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
