import React from "react";
import { useLocation, Link } from "react-router-dom";
import { HomeIcon, ChevronRight } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function Breadcrumbs() {
  // ici on obtient le chemin en cours d'utilisation qu'on met dans une variable
  // location
  const location = useLocation();

  // ici on convertit ce chemin en array [] tout en supprimer les / pour qu'il
  // n'y ait que des strings
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="aff-flex ai-mil gap-2 couleur-gris taille-pt mb-2">
      <HomeIcon size={18} />
      {pathnames.map((nom, index) => {
        // ici on map le tableau et on prend une route puis on la convertit en string en mettant / devant et derriere
        const route = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;
        return (
          <React.Fragment key={route}>
            <ChevronRight size={14} />
            {/*isLast ? (
              <span>{name}</span>
            ) : (
              <Link className={"couleur-gris"} to={routeTo}>{name}</Link>
            )*/}
            <AnimatePresence mode="wait">
              {isLast ? (
                <motion.span
                  key="enter"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {nom}
                </motion.span>
              ) : (
                <motion.span
                  key="sort"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Link to={route}>{nom}</Link>
                </motion.span>
              )}
            </AnimatePresence>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
