import clsx from "../classe";

export default function TexteDegrade({
  children,
  couleurs = "blue, red",
  direction = "to right",
  // eslint-disable-next-line no-unused-vars
  as: Component = "span",
  className = "",
  ...props
}) {
  return (
    <Component
      className={clsx("aff-inline-block texte-degrade", className)}
      style={{
        backgroundImage: `linear-gradient(${direction}, ${couleurs})`,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
