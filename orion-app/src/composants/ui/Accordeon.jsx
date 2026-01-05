import { useState } from "react";
import clsx from "../classe";
import { ChevronDown, Plus } from "lucide-react";

// fini

/**
 * type prend deux valeurs
 * - rotate : valeur par defaut
 * - croix : valeur definie
 */
export default function Accordeon({
  titre,
  children,
  className,
  icone,
  type = "rotate",
  ...props
}) {
  const [ouvert, setOuvert] = useState(false);

  const toggleAccordeon = () => {
    setOuvert(!ouvert);
  };

  // type prend deux valeurs (rotate et croix) pour les différentes icones
  // Icône par défaut selon le type
  const defaultIcones = {
    rotate: <ChevronDown size={20} />,
    croix: <Plus size={20} />,
  };

  const IconeAffichee = icone || defaultIcones[type];

  return (
    <div
      className={clsx("accordeon", ouvert && "ouvert", className)}
      {...props}
    >
      <div className="accordeon-header">
        <p className="accord-titre">{titre}</p>
        <button
          className={clsx("accordeon-bouton", ouvert && type)}
          onClick={toggleAccordeon}
          aria-label="Toggle accordeon"
        >
          {IconeAffichee}
        </button>
      </div>

      <div className="accordeon-contenu">{children}</div>
    </div>
  );
}
