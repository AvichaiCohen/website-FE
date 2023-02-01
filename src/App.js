import React from "react";
import Register from "./components/registration/Register";
import Login from "./components/registration/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./components/context/AuthProvider";
import Favorites from "./pages/Favorites";
import Orderlist from "./pages/OrderList";
import User from "./pages/User";
function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="/cart" element={<Orderlist />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
