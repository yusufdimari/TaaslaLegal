import "./App.css";
import Navbar from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Screens/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Screens/Auth/Login/Login";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import { ProvideAuth, useAuth } from "./Components/Auth/use-auth";
import Dashboard from "./Screens/Client/Dashboard/Dashboard";
import Profile from "./Screens/Client/Profile/Profile";
import Admin from "./Screens/Admin/Admin";
import BRForm from "./Screens/Client/Forms/BRForm";
import Documents from "./Screens/Client/Documents/Documents";
import BRRequests from "./Screens/Admin/BRRequest";
function App() {
  return (
    <body>
      <Router>
        <ProvideAuth>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/TaaslaLegal/" element={<Home />}></Route>
            <Route path="/TaaslaLegal/*" element={<ErrorPage />}></Route>
            <Route path="/TaaslaLegal/home" element={<Home />}></Route>
            <Route path="/TaaslaLegal/login" element={<Login />}></Route>
            <Route
              path="/TaaslaLegal/client/profile"
              element={<Profile />}
            ></Route>
            <Route
              path="/TaaslaLegal/client"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/TaaslaLegal/client/brform"
              element={
                <ProtectedRoute>
                  <BRForm />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/TaaslaLegal/client/documents"
              element={
                <ProtectedRoute>
                  <Documents />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/TaaslaLegal/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/TaaslaLegal/admin/brrequests"
              element={
                <ProtectedRoute>
                  <BRRequests />
                </ProtectedRoute>
              }
            ></Route>

            {/* <Route
              path="/TaaslaLegal/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/TaaslaLegal/*" element={<ErrorPage />}></Route>
            <Route path="/TaaslaLegal/instagram" element={<ExternalPage />} /> */}
          </Routes>
          <footer>
            <Footer />
          </footer>
        </ProvideAuth>
      </Router>
    </body>
  );
}

export default App;
