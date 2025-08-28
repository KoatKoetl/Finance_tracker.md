import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
// @ts-expect-error: using the js instead of typescript
import i18n from "./lib/i18n";

function App() {
  document.documentElement.lang = i18n.language;

  return (
    <Router>
      <Header></Header>
      <div className="max-w-[1440px] mx-auto">
        <RoutesComponent />
      </div>
      <Footer></Footer>
    </Router>
  );
}

export default App;
