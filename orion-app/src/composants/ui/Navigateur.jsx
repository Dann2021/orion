/* eslint-disable no-unused-vars */
import "../../styles/navigateur.css";
import Lien from "./Lien";
import TexteDegrade from "./TexteDegrade";

import { useState } from "react";
import Couleurs from "../../constantes/Couleurs";

export default function Navigateur({ logo, texte }) {
  const [activeur, setActiveur] = useState(false);

  const ouverture = () => setActiveur(!activeur);

  return (
    <nav className={"conteneur sticky haut-0 navigateur  z-50"}>
      <div className="elements">
        <div className="logo">
          <Lien chemin={"/"}>
            {logo && <img src={logo} alt="" className="logo-image" />}
            {texte && (
              <TexteDegrade
                className="jersey texte-3"
                couleurs={`${Couleurs.cyan}, ${Couleurs.indigo}`}
              >
                {texte}
              </TexteDegrade>
            )}
          </Lien>
        </div>
        <div className="actions-btn">
          <div className="bt-user"></div>

          <div className="bt-hamburge aff-myn-none">
            {/*<Menu size={30} />*/}
            <div className="tag survol curseur-pointeur">
              <span className="tag-dot"></span>
              <p>Orion v0.1-alpha</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`menu-conteneur ${activeur ? "activeur" : ""}`}>
        <ul className="menu">
          <li>
            <div className="tag survol curseur-pointeur">
              <span className="tag-dot"></span>
              <p>Orion v0.1-alpha</p>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
