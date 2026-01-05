import { useState } from "react";
import Bouton from "../Bouton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Card from "../Card";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import clsx from "../../classe";

// creation d'un composant carousel Type 1
export default function Carousel({
  children,

  cardClassName,
}) {
  // variable de state pour l'index
  const [index, setIndex] = useState(0);

  // variable taille de images

  const elements = Array.isArray(children) ? children : [children];
  const total = elements.length;
  // fonctions pour faire defiler les elements
  const suivant = () => setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  const precedent = () =>
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));

  return (
    <div className="aff-flex jc-sb ai-mil gap-5">
      {/** disposition en flex, les éléments seront en ligne et espacer */}

      {/** partie gauche */}
      {/** bouton de gauche */}
      <Bouton
        onClick={precedent}
        taille={"min"}
        className={"ronde-2"}
        theme="claire"
      >
        <ArrowLeft size={16} />
      </Bouton>

      {/** centre */}
      <Card className={clsx("bloc-myn-10", cardClassName)}>
        <Card.Corps className={"overx-cache mh-1"}>
          <AnimatePresence key={index} mode="wait">
            {elements && total > 0 ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                {elements[index]}
              </motion.div>
            ) : (
              <p className="texte-3">Aucun élément pour l'instant</p>
            )}
          </AnimatePresence>
        </Card.Corps>
      </Card>

      {/** partie droite */}
      {/** bouton de droite */}

      <Bouton
        onClick={suivant}
        taille={"min"}
        className={"ronde-2"}
        theme="claire"
      >
        <ArrowRight size={16} />
      </Bouton>
    </div>
  );
}
