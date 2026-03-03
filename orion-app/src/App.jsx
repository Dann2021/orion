
import { BrowserRouter as Router } from "react-router-dom";
import { Navigateur } from "./composants/index";
import Routeur from "./routes/Routeur";
//import Footer from "./composants/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  return (
    <Router>
      <div className="inter">
        <header>
          <Navigateur texte={"Orion✨"}  />  
        </header>
        <div className="p-3">
          <ToastContainer position={"bottom-right"} autoClose={3000} />
        </div>
        <Routeur />
      </div>

      {/*<Footer />*/}
    </Router>
  );
}