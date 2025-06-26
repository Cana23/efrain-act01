import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyP from "./pages/PrivacyPolicy";
import ToS from "./pages/ToS";

function App() {
  return (
    <Router>
      <main className="flex p-6 bg-linear-to-r from-cyan-500 to-blue-500 h-screen w-screen justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terminos" element={<ToS />} />
          <Route path="/privacidad" element={<PrivacyP />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
