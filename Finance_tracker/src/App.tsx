import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// @ts-expect-error: using the js instead of typescript
import i18n from "./lib/i18n";

const queryClient = new QueryClient();

function App() {
  document.documentElement.lang = i18n.language;

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header></Header>
        <div className="max-w-[1440px] mx-auto">
          <RoutesComponent />
        </div>
        <Footer></Footer>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
