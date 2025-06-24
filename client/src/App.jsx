import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";
import BecomeAdmin from "./pages/BecomeAdmin";

import "./App.css";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/become-admin"
                    element={
                        <PrivateRoute>
                            <BecomeAdmin />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create"
                    element={
                        <PrivateRoute>
                            <CreatePost />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditPost />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
