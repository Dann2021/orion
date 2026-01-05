import { useState } from "react";
import Bouton from "../Bouton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Card from "../Card";
import { AnimatePresence, motion } from "framer-motion";
import Image from "../Image";
import clsx from "../../classe";

// creation d'un composant carousel Type 1
export default function CarouselType1({
  images = [],
  tailleImage,
  imageClassName,
  cardClassName,
}) {
  // variable de state pour l'index
  const [index, setIndex] = useState(0);

  

  // variable taille de images
  const total = images.length;

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
            {images && total > 0 ? (
              <Image
                key={index}
                initial={{ opacity: 0, x: 300  }}
                animate={{ opacity: 1, x: 0  }}
                exit={{ opacity: 0, x: -300  }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                as={motion.img}
                className={clsx(
                  "image-cover ronde-2 curseur-pointeur",
                  imageClassName
                )}
                width={tailleImage}
                height={tailleImage}
                source={images[index]}
                alt={`image_${index}`}
              />
            ) : (
              <p className="texte-3">Aucune image pour l'instant</p>
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
