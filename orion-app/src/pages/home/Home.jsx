import { Bloc, Bouton, Card, Conteneur, Input } from "../../composants";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, History, Search, User2, X } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import clsx from "../../composants/classe";
import SidebarLien from "../../composants/SidebarLien";
import TabLien from "../../composants/TabLien";
import { liens } from "./liens";

export default function Home() {
  const [isSearch, setIsSearch] = useState(false);

  const openSearch = () => setIsSearch(true);
  const closeSearch = () => setIsSearch(false);
  return (
    <Conteneur className={"relative"}>
      <div className={clsx("aff-flex jc-sb gap-3  mh-2", isSearch && "flou-1")}>
        <Bloc
          type={"myn"}
          nombre={2}
          className={"ronde-1 aff-none aff-myn-block h-5"}
        >
          <SidebarLien liens={liens} />
        </Bloc>
        <Bloc type={"myn"} nombre={9} className={"relative"}>
          <div className="w-full aff-flex jc-fin gap-2">
            <Bouton
              onClick={openSearch}
              taille={"min"}
              style={{ background: "var(--bg-surface-2)" }}
              className={"ronde-1"}
            >
              <Search size={20} />
            </Bouton>
            <Bouton
              taille={"min"}
              style={{ background: "var(--bg-surface-2)" }}
              className={"ronde-1"}
            >
              <Bell size={20} />
            </Bouton>

            <Bouton
              taille={"min"}
              style={{ background: "var(--bg-surface-2)" }}
              className={"ronde-1"}
            >
              <User2 size={20} />
            </Bouton>
          </div>

          <TabLien />
          {/*<Breadcrumbs /> */}
          <Outlet />
        </Bloc>
      </div>
      <AnimatePresence mode="wait">
        {isSearch && <CardSearch closeSearch={closeSearch} />}
      </AnimatePresence>
    </Conteneur>
  );
}

const CardSearch = ({ closeSearch }) => {
  return (
    <Card
      as={motion.div}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      className={"bloc-myn-5 ronde-1 absolue haut-25 droite-3 z-20 h-4"}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }}
    >
      <Card.Header className={"aff-flex jc-sb gap-2"}>
        <Input
          dataType={"arrondie"}
          classNameSurcharge={"bloc-11"}
          simple
          placeholder={"Saisir un mot clé"}
        >
          <Search className="iconeElement" size={16} />
        </Input>
        <Bouton
          onClick={closeSearch}
          className={"ronde-1"}
          theme="sombre"
          taille={"min"}
        >
          <X size={20} />
        </Bouton>
      </Card.Header>

      <Card.Corps className={"aff-flex ai-mil fd-col gap-3 p-2"}>

        <History size={16} style={{ color: "var(--text-muted)" }} />
        <span style={{ color: "var(--text-muted)" }}>Aucun résultat trouvé</span>


      </Card.Corps>
    </Card>
  );
};
