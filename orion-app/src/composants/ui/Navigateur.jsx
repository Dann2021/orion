/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Couleurs from "../../constantes/Couleurs";
import "../../styles/navigateur.css";
import Bouton from "./Bouton";
import Lien from "./Lien";
import TexteDegrade from "./TexteDegrade";

export default function Navigateur({ logo, texte }) {
  const [activeur, setActiveur] = useState(false);

  const ouverture = () => setActiveur(!activeur);

  // Initialisation du state directement depuis le localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // Synchronisation DOM + stockage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle thème
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
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

          <div className="bt-hamburge aff-flex ai-mil gap-5 aff-myn-none">
            {/*<Menu size={30} />*/}
            <ToggleSwitch theme={theme} toggleTheme={toggleTheme} />
            <div className="tag survol curseur-pointeur">
              <span className="tag-dot"></span>
              <p>Orion v0.1-alpha</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`menu-conteneur ${activeur ? "activeur" : ""}`}>
        <ul className="menu">
          <li className="aff-flex ai-mil gap-5">
            <ToggleSwitch theme={theme} toggleTheme={toggleTheme} />
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

const ToggleSwitch = ({ toggleTheme, theme }) => {
  return (
    <Bouton
      onClick={toggleTheme}
      taille={"min"}
      theme="sombre"
      className={"bouton-icone ronde-1"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Sun size={14} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Moon size={14} />
          </motion.div>
        )}
      </AnimatePresence>
    </Bouton>
  );
};
