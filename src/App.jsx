import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./authentication/Login";
import CreateRafffle from "./components/CreateRafffle/CreateRafffle";
import WalletNFT from "./components/WalletNFT/WalletNFT";

// Toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ViewRafffle from "./components/ViewRafffle/ViewRafffle";

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {pathname === "/" && <Login />}
      <Routes>
        <Route exact path="/wallet" element={<WalletNFT />} />
        <Route exact path="/create" element={<CreateRafffle />} />
        <Route exact path="/view" element={<ViewRafffle />} />
      </Routes>
    </>
  );
};

export default App;
