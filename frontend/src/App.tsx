import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ToS from "./pages/ToS";
import Form from "./pages/Form";

function App() {
  return (
    <Router>
      <main className="flex p-6 bg-linear-to-r from-cyan-500 to-blue-500 h-screen w-screen justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/terminos" element={<ToS />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;