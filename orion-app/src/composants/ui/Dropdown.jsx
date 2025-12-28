import React, { useState, useRef, useEffect } from "react";
import clsx from "../classe";

export default function Dropdown({
  label,
  labelClassName,
  icone,
  children,
  className,
  contenuClassName,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        "dropdown                                                                                                                                                                                                                                                                                                                                   ",
        className
      )}
      {...props}
    >
      <button
        className={clsx("dropdown-btn", labelClassName)}
        onClick={() => setOpen(!open)}
      >
        {label} {icone}
      </button>

      {open && (
        <ul className={clsx("dropdown-contenu", contenuClassName)}>
          {children}
        </ul>
      )}
    </div>
  );
}
