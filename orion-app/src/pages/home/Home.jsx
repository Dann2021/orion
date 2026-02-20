import { Bloc, Conteneur } from "../../composants";

//import { Bell, Search, User2 } from "lucide-react";
import { Outlet } from "react-router-dom";
import SidebarLien from "../../composants/SidebarLien";
import TabLien from "../../composants/TabLien";
import { liens } from "./liens";

export default function Home() {
  return (
    <Conteneur>
      <div className="aff-flex jc-sb gap-3  mh-2 ronde-1">
        <Bloc
          type={"myn"}
          nombre={2}
          className={"ronde-1 aff-none aff-myn-block h-5"}
        >
          <SidebarLien liens={liens} />
        </Bloc>
        <Bloc type={"myn"} nombre={9}>
          {/*<div className="w-full aff-flex jc-fin gap-2">
            <Bouton
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
          </div>*/}

          <TabLien />
          {/*<Breadcrumbs />*/}
          <Outlet />
        </Bloc>
    
      </div>
    </Conteneur>
  );
}
