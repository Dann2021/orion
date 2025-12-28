import { Bloc, Conteneur } from "../../composants";

import { Outlet } from "react-router-dom";
import SidebarLien from "../../composants/SidebarLien";
import TabLien from "../../composants/TabLien";
import { liens } from "./liens";


export default function Home() {
  return (
    <Conteneur className={"ronde-1"}>
      {/*<div className="aff-flex jc-sb ai-mil gap-3">
        <Bouton
          taille={"min"}
          theme="sombre"
          className={"bouton-icone ronde-1"}
        >
          <PlusCircle /> Nouveau projet
        </Bouton>

        <User2Icon size={20} />
      </div>*/}

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
        
          {/*<Bloc type={"myn"} nombre={2} className={"ronde-1 aff-none aff-myn-block h-5"}>
          <h3>Configurations</h3>
          <div className="mh-2 mg-2">
            <h4 className="aff-flex ai-mil gap-3">
              <span className="tag-dot-2"></span>
              <Folder size={16} />
              <span className="te-noir">app</span>
            </h4>
            <ul className="mh-1 lst-aucun mg-3">
              <li className="aff-flex ai-mil gap-3">
               <File size={16} />
                <span className="te-noir couleur-vert-claire">config.json</span>
              </li>
              <li className="aff-flex ai-mil gap-3">
                  <File size={16} />
                <span className="te-noir couleur-vert-claire">routes.json</span>
              </li>
              <li className="aff-flex ai-mil gap-3">
                  <File size={16} />
                <span className="te-noir couleur-vert-claire">database.json</span>
              </li>

            </ul>
          </div>
        </Bloc>*/}
      </div>
    </Conteneur>
  );
}
