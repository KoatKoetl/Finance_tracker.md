import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <RoutesComponent />
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
