import clsx from "../classe";

// eslint-disable-next-line no-unused-vars
export default function Card({ className, children, as: Compenent = "div", ...props }) {
  return (
    <Compenent className={clsx("bloc-12 ronde p-2", className)} {...props}>
      {children}
    </Compenent>
  );
}

Card.Header = ({ children, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

Card.Corps = ({ children, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

Card.Bas = ({ children, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
