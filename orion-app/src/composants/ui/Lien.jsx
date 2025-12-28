import { Link } from "react-router-dom";
import clsx from "../classe";
export default function Lien({ children, className, chemin,  ...props }) {
  return (
    <Link to={chemin} className={clsx("td-none", className)}  {...props}>
      {children}
    </Link>
  );
}
