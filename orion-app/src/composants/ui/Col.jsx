import clsx from "../classe";

// fini 
/**
 * Composant colonne permet de mettre une disposition 
 * en colonne de tous ses enfants
 * col represente un display : flex ; flex-direction : column
 * 
 */

export default function Col({ children, className, ...props }) {
  return (
    <div className={clsx("col", className)} {...props}>
      {children}
    </div>
  );
}
