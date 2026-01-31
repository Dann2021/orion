import { Route, Routes } from "react-router-dom";

// Imports directs (plus de lazy)
import Home from "../pages/home/Home";

import PageErreur from "../pages/404/PageErreur";
import ApiTest from "../pages/api_test/ApiTest";
import Classe from "../pages/classe/Classe";
import Dashboard from "../pages/dashboard/Dashboard";
import Docs from "../pages/docs/Docs";
import PageEnv from "../pages/pageEnv/PageEnv";
import Projet from "../pages/projet/Projet";

function Routeur() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* route par défaut */}
        <Route index element={<Dashboard />} />

        {/* routes enfants */}
        <Route path="dash" element={<Dashboard />} />
        <Route path="classes" element={<Classe />} />
        <Route path="projets" element={<Projet />} />
        <Route path="api" element={<ApiTest />} />

        <Route path="*" element={<PageErreur />} />
        <Route path="docs" element={<Docs />} />

        <Route path="cle-env" element={<PageEnv />} />

        {/* plus tard :
        <Route path="projet" element={<Projet />} />
        <Route path="pricing" element={<Pricing />} />
        
        */}
      </Route>

      <Route path="*" element={<PageErreur />} />
    </Routes>
  );
}

export default Routeur;
