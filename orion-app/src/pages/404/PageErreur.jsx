import { AlertCircleIcon, LucideMessageCircleWarning } from "lucide-react";

import { Bloc, Col, Lien, Conteneur } from "../../composants";

export default function PageErreur() {
  return (
    <Conteneur className={"poppins"}>
      <Col className={"jc-mil ai-mil gap-5"}>
        <Titre titre={"Page Introuvable"} className={"couleur-rouge-cerise"}>
          <AlertCircleIcon />
        </Titre>

        <Bloc type={"myn"} nombre={11}>
          {/*<Icons.Erreur404 height={400} width={400} className="image" />*/}
          <LucideMessageCircleWarning />
        </Bloc>
        <div className="defilement">
          <Titre
            titre={"Retournez en arrière"}
            className={"couleur-rouge-cerise element-defile"}
          />
        </div>
        <p className="ta-mil">
          <Lien chemin={"/"} className={"couleur-vert-jade"}>
            Retournez à l&apos;acceuil
          </Lien>
        </p>
      </Col>
    </Conteneur>
  );
}

function Titre({ titre, className, children }) {
  return (
    <p className={`taille-gd te-gras couleur-gris ${className}`}>
      {children} {titre}
    </p>
  );
}
