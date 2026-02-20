const TagModele = ({
  nom,
  onClick,

  className,
  // eslint-disable-next-line no-unused-vars
  as: Component = "div",
  ...props
}) => {
  return (
    <Component
      onClick={onClick}
      {...props}
      className={
        "aff-flex fd-col jc-sb gap-1 survol curseur-pointeur " + className
      }
    >
      <pre className="tag">
        <span className="tag-dot-2"></span>
        <code>{nom}</code>
      </pre>
    </Component>
  );
};

export default TagModele;
