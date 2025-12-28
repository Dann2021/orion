import clsx from "../classe";

function Image({
  source,
  className,
  alt,
  width,
  height,
  // eslint-disable-next-line no-unused-vars
  as: Component = "img",
  masque,
  ...props
}) {
  return (
    <Component
      loading="lazy"
      src={source}
      className={clsx("image", className)}
      alt={alt}
      width={width}
      height={height}
      hidden={masque}
      {...props}
    />
  );
}

export default Image;
