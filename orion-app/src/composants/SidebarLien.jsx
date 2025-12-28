// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Accordeon, Lien } from "./index";
import clsx from "./classe";
import { User2 } from "lucide-react";

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
              background: actif
                ? "rgba(56, 189, 248, 0.12)"
                : "rgba(0,0,0,0)",
            }}
          >
            <Lien
              
              chemin={element.lien}
              className={clsx(
                "aff-flex ai-mil gap-2 px-2 py-1",
                actif
                  ? "couleur-primaire"
                  : "couleur-texte-mute"
              )}
            >
              <Icone size={16} />
              {element.label}
            </Lien>

            
          </motion.li>
        );
      })}
    </ul>
  );
}
