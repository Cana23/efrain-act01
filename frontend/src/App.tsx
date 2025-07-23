import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ToS from "./pages/ToS";
import CRM from "./pages/CRM";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/authContext";
import Protected from "./pages/Protected";

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <main className="flex bg-linear-to-r from-cyan-300 to-blue-400 h-screen w-screen justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos" element={<ToS />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/crm"
            element={
              <PrivateRoute>
                <CRM />
              </PrivateRoute>
            }
          />
          <Route path="/protected" element={<Protected />} />
        </Routes>
      </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
