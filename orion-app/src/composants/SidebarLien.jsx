// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import clsx from "./classe";
import { Lien } from "./index";

export default function SidebarLien({ liens }) {
  const location = useLocation();

  const itemVariants = {
    hover: { background: "var(--bg-surface-2)" },
  };

  return (
    <ul className="lst-aucun">
      {liens.map((element) => {
        const actif = location.pathname.endsWith(element.lien);
        const Icone = element.icone; // composant icône

        return (
          <motion.li
            key={element.id}
            whileHover="hover"
            variants={itemVariants}
            transition={{ duration: 0.2 }}
            className="ronde-1 mb-1"
            style={{
              background: actif ? "rgba(56, 189, 248, 0.12)" : "rgba(0,0,0,0)",
            }}
          >
            <Lien
              chemin={element.lien}
              className={clsx(
                "aff-flex jc-sb ai-mil gap-2 px-2 py-1",
                actif ? "couleur-primaire" : "couleur-texte-mute",
              )}
            >
              <div className="aff-flex gap-2 ai-mil">
                <Icone size={16} />
                {element.label}
              </div>
              {/*<span className="tag">3</span> */} {/* Exemple de badge */}
             
              {actif && <span className="tag-dot-2"></span>}
            </Lien>
          </motion.li>
        );
      })}
    </ul>
  );
}
