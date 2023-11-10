import React from "react";
import Header from "./component/Header";
import Maps from "./component/Maps";
import ProtectedRoute from "./component/Protected";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = localStorage.getItem("user");
  // console.log(user, "useeee");
  return (
    <>
      <Router>
        <div className="Container">
          {user ? <Header /> : ""}
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
            <Route path="/maps" element={<Maps />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
