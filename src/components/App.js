import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import AddGlucose from "../pages/AddGlucose";
import EditGlucose from "../pages/EditGlucose";
import Blog from "../pages/Blog";

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
        <Route path="/AddGlucose" element={<ProtectedRoute component={AddGlucose} />} />
        <Route path="/EditGlucose/:id" element={<ProtectedRoute component={EditGlucose} />} />
        <Route path="/blog" element={<ProtectedRoute component={Blog} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;



































