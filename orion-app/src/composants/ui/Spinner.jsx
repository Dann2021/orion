import clsx from "../classe.js";

export default function Spinner({ type, className, taille, centre = "non" }) {
  return (
    <div
      className={clsx("spinner", `spinner-${type}`, centre === "oui" ? "centre" : "" ,className)}
      style={{ height: `${taille}px`, width: `${taille}px` }}
    ></div>
  );
}
