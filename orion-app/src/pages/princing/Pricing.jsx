import { CheckCircle2 } from "lucide-react";
import { Bouton, Card, Col, Ligne } from "../../composants";
import { basique, standard, style } from "./constante";

export default function Pricing() {
  return (
    <Col>
      <h1 className="inter">Pricing</h1>

      <Ligne className={"gap-8"}>
        <AbonnementCard prix={0} type={"basique"} fonctionnalites={basique} labelBouton={"S'abonner"} />
        <AbonnementCard prix={300} type={"standard"} fonctionnalites={standard} labelBouton={"S'abonner"} />
        <AbonnementCard prix={1000} type={"Entreprise"} labelBouton={"Contacter"}>
            <h2>Veuillez nous contacter pour avoir plus d'information</h2>
        </AbonnementCard>
      </Ligne>
    </Col>
  );
}

const AbonnementCard = ({ prix, type, labelBouton, fonctionnalites = [], children }) => {
  return (
    <Card className={"bloc-myn-3 bloc-tp-8 bloc-pt-5  curseur-pointeur"} style={style}>
      <Card.Header className={"aff-flex jc-sb gap-5 ai-mil"}>
        <h1 className="texte-5 ">${prix}</h1>
        <div className="tag">
          <span className="tag-dot"></span>
          <h4 className="tt-cap">{type}</h4>
        </div>
      </Card.Header>

      <Card.Corps className={"px-1 mh-3"}>
        {fonctionnalites && fonctionnalites.length > 0 ? (
          <ul className="lst-aucun">
            {fonctionnalites.map((element) => (
              <li key={element.id} className="aff-flex gap-3 ai-mil mb-1">
                <CheckCircle2 size={20} />
                <span className="inter">{element.label}</span>
              </li>
            ))}
          </ul>
        ) : (
          children
        )}
      </Card.Corps>

      <Card.Bas className={"aff-flex fd-col ai-mil mh-3"}>
        <Bouton theme="prime" className={"ronde-1 bouton-block"}>
          {labelBouton}
        </Bouton>
      </Card.Bas>
    </Card>
  );
};
