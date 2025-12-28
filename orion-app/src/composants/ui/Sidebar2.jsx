import {
  BookOpen,
  Package,
  X
} from "lucide-react";
import { useRef, useState } from "react";
import { CgComponents, CgTemplate } from "react-icons/cg";
import Lien from "./Lien";

// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import clsx from "../classe";

export default function Sidebar2({  onSelect, ouvert, onClose }) {
  // variables de state
  const sidebarRef = useRef(null);

  const [lienActif, setLienActif] = useState(null);

 

  // variable pour section Documentation
  const docs = [
    {
      id: 1,
      label: "Composants",
      icone: <CgComponents size={20} />,
      lien: "composant",
    },
    {
      id: 2,
      label: "Templates",
      icone: <CgTemplate size={20} />,
      lien: "templates",
    },
    { id: 3, label: "Ui Kit", icone: <Package size={20} />, lien: "uikit" },
  ];

  // variable pour get_started
  const started = [
    { id: 1, label: "Introduction", icone: null, lien: "intro" },
    // { id: 2, label: "Installation", icone: null, lien: "install" },
    { id: 3, label: "Structure projet", icone: null, lien: "structure" },
  ];

  // variable pour mise en page
  const mpage = [
    { id: 1, label: "aspect-ratio", icone: null, lien: "aspect-ratio" },
    { id: 2, label: "display", icone: null, lien: "display" },
    { id: 3, label: "bloc", icone: null, lien: "bloc" },
    { id: 4, label: "couleurs", icone: null, lien: "couleurs" },
    { id: 5, label: "ligne & col", icone: null, lien: "ligne-col" },
    { id: 6, label: "z-index", icone: null, lien: "zindex" },
    { id: 7, label: "dimensions", icone: null, lien: "width-height" },
    { id: 8, label: "marges", icone: null, lien: "marges" },
  ];

  const composants = [
    { id: 1, label: "Accordeon", icone: null, lien: "accordeon" },
    { id: 2, label: "Bouton", icone: null, lien: "bouton" },
    { id: 3, label: "Card", icone: null, lien: "card" },
    { id: 4, label: "Carrousel", icone: null, lien: "carrousel" },
    { id: 5, label: "Dropdown", icone: null, lien: "dropdown" },
    { id: 6, label: "Tableau", icone: null, lien: "tableau" },
    // { id: 7, label: "Modal", icone: null, lien: "modal" },
  ];

  const itemVariants = {
    hover: { background: "#f1f3f5" },
    exit: { opacity: 0, scale: 0.7 },
  };

  // #e9ecef,#f1f3f5 (très bien), #dee2e6 (bien), #e6f2ea

  //console.log("state : ", ouvert);

  const renduLien = (elements) =>
    elements.map((element) => {
      const lienChoisit = lienActif === element.lien;

      return (
        <motion.div
          key={element.id}
          initial={false}
          whileHover="hover"
          variants={itemVariants}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`ronde-1 curseur-pointeur mb-1`}
          style={{ background: lienChoisit ? "#f1f3f5" : "#fff" }}
          onClick={() => {
            setLienActif(element.lien);
            onSelect?.(element.lien);
          }}
        >
          <Lien
            key={element.id}
            chemin={element.lien}
            className={clsx(
              "gap-2 aff-flex ai-mil px-2 py-1 te-noir",
              lienChoisit && "couleur-bleu-ciel"
            )}
          >
            {element.icone} {element.label}
          </Lien>
        </motion.div>
      );
    });
  return (
    <div
      ref={sidebarRef}
      style={{background: "#fff"}}
      className={clsx(
        "bloc-myn-3 fixe new-sidebar h-full overx-cache overy-auto pos-myn-sticky z-100",
        ouvert && "active"
        //ouvert && "ronde",
        //ouvert && "bg-gris-claire"
      )}
      id="maSidebar"
    >
      <div className="aff-flex jc-fin mb-2  aff-myn-none p-1">
        <X size={20} className="fermer curseur-pointeur mh-2" onClick={onClose} />
      </div>

      <div className="mg-1 aff-flex ai-mil gap-2 couleur-gri">
        <BookOpen size={20} />
        <h5>Documentation</h5>
      </div>

      <div className="taille-pt mh-2 couleur-gris">{renduLien(docs)}</div>

      <p className="mg-1 tt-cap couleur-gri my-2">get started</p>
      <div className="taille-pt mh-3 couleur-gris">{renduLien(started)}</div>

      <p className="mg-1 tt-cap couleur-gri my-2">Classes</p>
      <div className="taille-pt mh-3 couleur-gris">{renduLien(mpage)}</div>

      <p className={"mg-1 tt-cap couleur-gri my-2"}>composants</p>
      <div className="taille-pt mh-3 couleur-gris">{renduLien(composants)}</div>
    </div>
  );
}
