import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";

import { AuthContextComponent } from "../contexts/authContext";

// imports
import Navbar from "./Navbar";
import { Nav } from "react-bootstrap";

function App() {
  return (
    <AuthContextComponent>
    <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;



































