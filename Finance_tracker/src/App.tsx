import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <div className="max-w-[1440px] mx-auto">
          <RoutesComponent />
        </div>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
