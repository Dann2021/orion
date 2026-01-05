import { Folder, Trash2 } from "lucide-react";
import { Bouton, Card, Col, Ligne, Spinner } from "../../composants";

import axios from "axios";
import { baseProjet, baseUrl } from "../../api/api";
import useDataGet from "../../hooks/useDataGet";

export default function Projet() {
  // state pour recuperer la valeur de la liste des projets
  //const [projetsListe, setProjetsListe] = useState([]);

  // import du hooks useDataGet
  const { data, loading } = useDataGet(`${baseUrl}${baseProjet}/`);

  //const projets = data?.projets;

  const projets = data?.projets ?? [];

  // creation de la fonction pour supprimer un projet

  const handleSupprimerProjet = async (id) => {
    try {
      const rep = await axios.delete(`${baseUrl}${baseProjet}/${id}`, {
        withCredentials: true,
      });

      if (rep.status === 200) {
        alert(data.message || "Projet supprimé avec succès");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };



  return (
    <Col>
      <h1 className="inter">Vos projets</h1>

      <Ligne className={"mh-2 fw-wrap gap-3 overy-auto"}>
        {loading ? (
          <Spinner centre="oui" type={1} taille={20} />
        ) : projets.length === 0 ? (
          <p>Aucun projet pour le moment</p>
        ) : (
          projets.map((element) => (
            <CardProjet
              key={element.id}
              nom={element.nom}
              nomAuteur={element.auteur}
              onClick={() => handleSupprimerProjet(element.id)}
            />
          ))
        )}
      </Ligne>
    </Col>
  );
}

const CardProjet = ({ nom, nomAuteur, onClick }) => {
  return (
    <Card
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }}
      className={"bloc-myn-3 bloc-pt-5 curseur-pointeur survol"}
    >
      <Card.Header className={"aff-flex jc-sb ai-mil"}>
        <div className="tag survol curseur-pointeur">
          <span className="tag-dot"></span>
          <h2 className="inter taille-pt">{nom}</h2>
        </div>

        <Bouton
          onClick={onClick}
          taille={"min"}
          className={"taille-pt bouton-icone"}
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
          }}
        >
          Supprimer
          <Trash2 size={16} />
        </Bouton>
      </Card.Header>

      <Card.Corps className={"mh-3 aff-flex jc-mil ai-mil"}>
        <Folder size={50} />
      </Card.Corps>
      <Card.Bas>
        <p className="inter ta-droite taille-pt">{nomAuteur}</p>
      </Card.Bas>
    </Card>
  );
};
