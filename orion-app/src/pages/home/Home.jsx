import { Bloc, Conteneur } from "../../composants";

import { Outlet } from "react-router-dom";
import SidebarLien from "../../composants/SidebarLien";
import TabLien from "../../composants/TabLien";
import { liens } from "./liens";

export default function Home() {
  return (
    <Conteneur className={"ronde-1"}>
      <div className="aff-flex jc-mil gap-3  mh-2 ronde-1">
        <Bloc
          type={"myn"}
          nombre={2}
          className={"ronde-1 aff-none aff-myn-block h-5"}
        >
          <SidebarLien liens={liens} />
        </Bloc>
        <Bloc type={"myn"} nombre={9} className={"ronde-1"}>
          <TabLien />
          <Outlet />
        </Bloc>
      </div>
    </Conteneur>
  );
}
