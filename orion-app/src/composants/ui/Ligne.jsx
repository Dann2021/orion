import clsx from "../classe";

/**
 * Ce composant permet d'avoir une disposition en ligne de
 * ses enfants
 * Il equivaut à un display : flex
 * 
 * 
 */
export default function Ligne({ children, className,  ...props }) {
  return (
    <div className={clsx("ligne gap-5 py-2", className)} {...props}>
      {children}
    </div>
  );
}
