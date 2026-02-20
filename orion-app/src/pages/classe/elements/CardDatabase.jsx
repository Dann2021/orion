import { CheckCircle2Icon } from "lucide-react";
import { Card } from "../../../composants";

const CardDatabase = ({
  icone: Icone,
  label,
  commande,
  description,
  onClick,
  className = "",
  style
}) => {
  return (
    <Card
      className={"bloc-myn-3 bloc-pt-4 curseur-pointeur survol " + className}
      style={style}
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

export default CardDatabase;