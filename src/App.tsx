import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/styles/global.scss";
import { AuthContextProvider } from "./Context/AuthContext";
import Home from "./pages/Home";
import { Login } from "./pages/Login";


const App: React.FC = () => {
  return (
    <AuthContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home user={undefined} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </AuthContextProvider>
  );
};

export default App;
