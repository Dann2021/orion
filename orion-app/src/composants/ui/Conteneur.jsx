import clsx from "../classe";

// Creation d'un composant conteneur
/**
 * Composant principal à integrer dans une page web
 *
 */
export default function Conteneur({
  children,
  // eslint-disable-next-line no-unused-vars
  as: Element = "div",
  className,
  ...props
}) {
  return (
    <Element className={clsx("conteneur py-5", className)} {...props}>
      {children}
    </Element>
  );
}
