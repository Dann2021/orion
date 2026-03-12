import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./composants/Footer";
import { Navigateur } from "./composants/index";
import Routeur from "./routes/Routeur";

export default function App() {
  return (
    <Router>
      <div className="inter">
        <header>
          <Navigateur texte={"Orion✨"} />
        </header>
        <Routeur />
      </div>
      <Footer />
    </Router>
  );
}
