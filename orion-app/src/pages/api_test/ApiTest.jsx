import { Col } from "../../composants";
import dataJson from "./api.json";

const style = {
  border: "1px solid var(--border)",
  backgroundColor: "var(--bg-surface)",
};
export default function ApiTest() {
  return (
    <Col>
      <h1 className="mb-1 inter">Documentation API (REST)</h1>
      <PreviewApiTestJson dataJson={dataJson} />
    </Col>
  );
}


const PreviewApiTestJson = ({ dataJson }) => {
  return (
    <div className="bloc-myn-10  p-4 ronde-1 overy-auto" style={style}>
      {dataJson.map((item, index) => (
        <div key={index} className="mb-4 p-3" >
          <div className="aff-flex gap-4 ai-mil">
            <span className="tag">
              <code>{item.method}</code>
            </span>
            <strong className="taille-pt inter">{item.path}</strong>
          </div>

          <p className="mh-1 inter">{item.description}</p>

          {/* REQUEST */}
          {item.request && (
            <>
              <h4 className="mh-1">Request body</h4>
              <pre className="taille-pt">{JSON.stringify(item.request.body, null, 2)}</pre>
            </>
          )}

          {/* RESPONSE */}
          <h4 className="mh-1">Response ({item.response.status})</h4>
          <pre className="taille-pt">{JSON.stringify(item.response.body, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};
