import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
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
                    path="/create"
                    element={
                        <PrivateRoute>
                            <CreatePost />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
