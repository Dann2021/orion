import clsx from "../classe";

// fini
/**
 * type prend les valeurs suivantes : primaire, prime, secondaire, danger, alerte
 * variant c'est pour ajouter les contours
 * taille prend les valeurs : min, me et max
 *
 *
 *
 */
/**
 * Props :
 * - theme : "primaire" | "prime" | "secondaire" | "danger" | "alerte"
 * - variant : "normal" | "contour"
 * - taille : "min" | "me" | "max"
 * - forme  : "rond" | "carre" | ...
 * - mode   : "button" | "submit" | "reset"
 */

export default function Bouton({
  theme = "primaire",
  variant,
  className,
  children,
  mode = "button",
  taille, // min, me, max
  forme,
  as: Component = "button",
  ...props
}) {
  return (
    <Component
      className={clsx(
        "bouton",
        "td-none",
        
        variant  ? `bouton-contour-${theme}` : `bouton-${theme}`,
        taille && `bouton-${taille}`,
        forme && `bouton-${forme}`,
        className
      )}
      type={Component === "button" ? mode : undefined}
      role={Component !== "button" ? "button" : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}