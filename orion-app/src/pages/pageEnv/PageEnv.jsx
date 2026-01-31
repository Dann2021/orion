import { Copy, KeyRoundIcon, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { Bloc, Bouton, Col, Input } from "../../composants";
import { style } from "./constante";

export default function PageEnv() {
  const [nomCle, setNomCle] = useState("");
  return (
    <Col className={"py-3"}>
      <h1>Générez vos variables d'environnement</h1>

      <Bloc
        type={"myn"}
        className={"ronde-1 p-2 mh-4"}
        nombre={10}
        style={style}
      >
        <div className="tag">
          <span className="tag-dot"></span>
          <h4 className="fira">variable d'environnement</h4>
        </div>

        <p className="mh-3">
          Les variables d'environnement sont généralement utilisées pour stocker
          des valeurs comme des clés d'api, secret ou jwt.
        </p>

        <div className="aff-flex fd-col ai-mil my-5">
          <div className="aff-flex gap-3 w-full jc-mil">
            <Input
              classNameSurcharge={"bloc-myn-6"}
              className="p-1 tt-maj"
              simple
              dataType={"arrondie"}
              placeholder={"API_KEY"}
              label={"API KEY"}
              onChange={(e) => setNomCle(e.target.value)}
              value={nomCle}
            >
              <KeyRoundIcon className="iconeElement" size={16} />
            </Input>

            <Bouton theme="sombre" className={"ronde-1"}>
              <SendHorizonal size={20} />
            </Bouton>
          </div>

          <ClePreview cle={"jdjrjooehfajjruuihhghdazertyuiopqsdfghjklmwxcvbnjdjrjooehfajjruuihhghdazertyuio"} titre={"API_KEY"} />


        </div>
      </Bloc>
    </Col>
  );
}




const ClePreview = ({ cle }) => {
  const copy = () => {
    navigator.clipboard.writeText(cle);
    alert("Clé copiée dans le presse-papiers !");
  };
  return (
    <div
      className="mh-5 bloc-myn-7 bloc-12 bloc-tp-10 p-2 bloc-pt-7 ronde w-full"
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }}
    >
       
      <div className="aff-flex jc-sb ai-mil">
         <h5>API KEY</h5>
       <Bouton onClick={copy} taille={"min"} theme="sombre" className={"ronde-1 p-1"}>
        <Copy size={16} />
       </Bouton>
      </div>
      
      <div className="over-scroll">
        <p> {cle}</p>
       
        </div>
    </div>
  );
};
