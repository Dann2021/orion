import { Bloc, Col, Lien, Ligne, TexteDegrade } from "./index";
import { PlaneIcon } from "lucide-react";
import { CgFacebook, CgInstagram } from "react-icons/cg";
import { BsGithub, BsAmazon, BsTwitterX } from "react-icons/bs";
import Couleurs from "../constantes/Couleurs";

export default function Footer() {
  const styleSocialBtn = {
    width: "20px",
    height: "20px",
    //background: "rgba(255, 255, 255, 0.03)",
    //color: "#f8fafc",
    fontWeight: 600,
    borderRadius: "8px",
  };

  return (
    <footer
      className="p-4 couleur-gris bg-gris-claire poppins"
      style={{
        //background: "linear-gradient(180deg, #0f1724 0%, #071022 100%)",
        backgroundColor: "#fff",
        backgroundImage: "radial-gradient(#d9d9d9 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        //color: "#f8fafc",
        fontSize: "0.95rem",
      }}
    >
      <Col className={"conteneur gap-4 mb-6"}>
        {/** Haut du footer */}

        <div className="aff-flex gap-3">
          <TexteDegrade
            as="h2"
            className="ubuntu"
            couleurs={`${Couleurs.cyan}, ${Couleurs.indigo}`}
          >
            Flexible✨
          </TexteDegrade>
        </div>

        <p className="mh-1">Simple. Moderne. Flexible.</p>

        {/** corps du footer  */}
        <Ligne className={"jc-sb  mb-4"}>
          <Bloc type={"myn"} nombre={2} className={"p-1"}>
            <h4 className="tt-maj">Navigation</h4>
            <ul className="lst-aucun gap-1 mh-1 ">
              <li>
                <Lien className="couleur-gris" to={"/"}>
                  Home
                </Lien>
              </li>
              <li>
                <Lien className="couleur-gris" to={"/docs"}>
                  Docs
                </Lien>
              </li>
              {/*<li>
                 <Lien className="couleur-gris" to={"/site-vitrine"}>Vitrine</Lien>
              </li>*/}
            </ul>
          </Bloc>
          <Bloc type={"myn"} nombre={2} className={"p-1"}>
            <h4 className="tt-maj">communauté</h4>
            <ul className="lst-aucun gap-1 mh-1">
                <li>
                    <Lien className="couleur-gris" to={"/profile"}>
                        Profile
                    </Lien>
                </li>
              <li>Devenir partenaire</li>
              <li>Événements AirLiv</li>
            </ul>
          </Bloc>
          <Bloc type={"myn"} nombre={2} className={"p-1"}>
            <h4 className="tt-maj">légal</h4>
            <ul className="lst-aucun gap-1 mh-1">
              <li>Conditions d’utilisation</li>
              <li>Politique de confidentialité</li>
              <li>Cookies</li>
              <li>Mentions légales</li>
            </ul>
          </Bloc>
        </Ligne>

        {/** Bas du footer */}

        <div className="ligne jc-sb ai-mil gap-6">
          <p>© 2025 Tous les droits réservés</p>
          {/*<p className="ta-mil">support@airliv.com</p>*/}
          <div className="aff-flex jc-mil  ai-mil gap-2">
            <CgInstagram
              size={16}
              className="aff-inline-flex td-none jc-mil ai-mil"
              style={styleSocialBtn}
            />
            <CgFacebook
              size={16}
              className="aff-inline-flex td-none jc-mil ai-mil"
              style={styleSocialBtn}
            />

            <BsGithub
              size={16}
              className="aff-inline-flex td-none jc-mil ai-mil"
              style={styleSocialBtn}
            />
            <BsAmazon
              size={16}
              className="aff-inline-flex td-none jc-mil ai-mil"
              style={styleSocialBtn}
            />
            <BsTwitterX
              size={16}
              className="aff-inline-flex td-none jc-mil ai-mil"
              style={styleSocialBtn}
            />
          </div>
        </div>
      </Col>
    </footer>
  );
}
