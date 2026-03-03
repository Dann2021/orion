import { Card } from '../../../composants';


const style3 = {
  border: "1px solid var(--border)",
  backgroundColor: "var(--bg-surface)",
};
export default function CardDash({icone, titre, children}) {
  return (
     <Card
          className={"bloc-myn-4 bloc-pt-4 survol curseur-pointeur card-dash"}
          style={style3}
        >
          <Card.Header className={"aff-flex jc-sb ai-mil mb-2"}>
           {icone}

            <div className="tag">
              <span className="tag-dot"></span>
              <span>{titre}</span>
            </div>
          </Card.Header>

          <Card.Corps>
            {children}
          </Card.Corps>
        </Card>
  )
}
