import React, { useState } from "react";
import clsx from "../classe";
import Bouton from "./Bouton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "./Image";

/**
 *  images : représente une liste qui contiendra tous les chemin (path ou source) des images
 *  taille : represente la taille en pixel que l'on souhaite donnée à toutes nos images
 *  titre  : C'est le nom que vous donnez à votre carrousel
 *
 */

export default function Carrousel({
  images = [],
  titre,
  classNameImages,
  taille,
  children,
}) {
  // Vérification du tableau d'images
  if (!Array.isArray(images)) {
    console.error("❌ La prop 'images' doit être un tableau.");
    images = [];
  }

  // pour garder la position de l'image en cours
  const [index, setIndex] = useState(0);

  // dataImages est un tableau d'images pour le carrousel

  // Filtrage : garder uniquement les valeurs valides (string non vide par ex)
  const validImages = images.filter(
    (src) => typeof src === "string" && src.trim() !== ""
  );

  // total du tableau dataImages
  const total = validImages.length;

  //const total = images.length;

  // fonctions pour les boutons

  // bouton precedent
  const prevImage = () =>
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));

  // bouton suivant
  const nextImage = () =>
    setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  // verification du tableau d'images
  // ⚠️ Gestion du cas tableau vide
  if (total === 0) {
    return (
      <div className="bloc-12 ronde bord-2 bord-rouge-cerise p-3">
        <p className="couleur-rouge-cerise">
          ⚠️ Aucune image disponible dans le carrousel.
        </p>
      </div>
    );
  }

  return (
    <>
      {/** Titre du carrousel */}
      <h1 className="texte-6 ls-2">{titre}</h1>

      {/** Bouton du carrousel */}
      <div className={clsx("aff-flex jc-sb ai-mil gap-2 mh-4 mb-3")}>
        <Bouton
          theme="claire"
          taille={"min"}
          className={"ronde-1"}
          onClick={prevImage}
        >
          <ArrowLeft size={15} />
        </Bouton>

        <Bouton
          theme="claire"
          taille={"min"}
          className={"ronde-1"}
          onClick={nextImage}
        >
          <ArrowRight size={15} />
        </Bouton>
      </div>

      {/** images */}

      <div
        className={clsx("bloc-12 ronde overx-auto p-3", classNameImages)}
        style={{ scrollBehavior: "smooth" }}
      >
        <div
          className="aff-flex gap-4 p-2"
          style={{
            transform: `translateX(-${index * taille}px)`,
            transition: "transform 0.5s ease",
          }}
        >
          {images.map((src, i) => (
            <Image
              key={i}
              className={"ronde survol curseur-pointeur"}
              alt={`image ${i + 1}`}
              source={src}
              height={taille}
              width={taille}
            />
          ))}
        </div>
      </div>
      {/** Elements enfants */}
      {children}
    </>
  );
}
