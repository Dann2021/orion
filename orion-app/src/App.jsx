
import { Navigateur } from "./composants/index";
import Routeur from "./routes/Routeur";
import { BrowserRouter as Router } from "react-router-dom";
//import Footer from "./composants/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


export default function App() {
  return (
    <Router>
      <div className="poppins">
        <header>
          <Navigateur texte={"Orion✨"} />  
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