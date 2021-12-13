import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import AddGlucose from "../pages/AddGlucose";
import EditGlucose from "../pages/EditGlucose";
import Blog from "../pages/Blog";
import PostDetails from "../pages/PostDetails";
import PostCreate from "../pages/PostCreate";

import PostDelete from "../pages/PostDelete";

import GlucoseDetails from "../pages/GlucoseDetails";

import { AuthContextComponent } from "../contexts/authContext";
import GlucoseDelete from "../pages/GlucoseDelete";
import EditPost from "../pages/EditPost";


// imports
import Navbar from "./Navbar";
// import { Nav } from "react-bootstrap";

function App() {
  return (
    <AuthContextComponent>
    <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/AddGlucose" element={<ProtectedRoute component={AddGlucose} />} />
        <Route path="/EditGlucose/:id" element={<ProtectedRoute component={EditGlucose} />} />
        <Route path="/blog" element={<ProtectedRoute component={Blog} />} />
        <Route path="/blog/:id" element={<ProtectedRoute component={PostDetails} />} />
        <Route path="/AddPost" element={<ProtectedRoute component={PostCreate} />} />
        <Route path="/post/delete/:id" element={<ProtectedRoute component={PostDelete} />} />
        <Route path="/EditPost/:id" element={<ProtectedRoute component={EditPost} />} />
        <Route path="/glucose/:id" element={<ProtectedRoute component={GlucoseDetails} />} />
        <Route path="/glucose/delete/:id" element={<ProtectedRoute component={GlucoseDelete} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;



































