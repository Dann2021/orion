// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Bouton from "./Bouton";
import Card from "./Card";

// background: "rgba(0,0,0,0.5)",
export default function Modal({ children, label }) {
  const [ouvert, setOuvert] = useState(false);

  const toggleOpen = () => setOuvert(true);
  const fermer = () => setOuvert(false);

  return (
    <div>
      <Bouton taille={"min"} onClick={toggleOpen}>
        {label}
      </Bouton>
      <AnimatePresence key={"modal"}>
        {ouvert && (
          <motion.div
            onClick={fermer}
            className="mh-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/*export default function Modal({ label, children }) {
  // state pour gérer les états
  const [isOpen, setIsOpen] = useState(false);

  // fonction pour gérer les états
  const ouvre = () => setIsOpen(true);
  const fermer = () => setIsOpen(false);

  return (
    <div>
      <Bouton onClick={ouvre} taille={"min"}>
        {label}
      </Bouton>

      <AnimatePresence key={"modal"}>
        {isOpen && (
          <motion.div
            className="mh-2 relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
          >
            <Card
              className={"bloc-myn-5 bloc-pt-8 absolue haut-1"}
              style={{
                backgroundColor: "white",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
            >
              <Card.Header>
                <h1>My Modal</h1>
              </Card.Header>
              <Card.Corps>{children}</Card.Corps>

              <Card.Bas className={"aff-flex jc-sb mh-1"}>
                <Bouton onClick={fermer} taille={"min"} className={"ronde-1"}>
                  fermer
                </Bouton>
                <Bouton
                  variant
                  taille={"min"}
                  theme="sombre"
                  className={"ronde-1"}
                >
                  continuer
                </Bouton>
              </Card.Bas>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}*/
