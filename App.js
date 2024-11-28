import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Customer/Dashboard";
import Login from "./pages/Customer/Login";
import Register from "./pages/Customer/Register";
import History from "./pages/Customer/History";
import Etalase from "./pages/Customer/Etalase";
import Checkout from "./pages/Customer/Checkout";
import Checkout2 from "./pages/Customer/Checkout2";

import DashboardAdmin from "./pages/Staff_Admin/DashBoardAdmin";
import Transaksi from "./pages/Staff_Admin/Transaksi";
import EtalaseAdmin from "./pages/Staff_Admin/Etalase";
import ManajemenPengguna from "./pages/Staff_Admin/ManajemenPengguna";
import ManajemenPesanan from "./pages/Staff_Admin/ManajemenPesanan";
import EditPesanan from "./pages/Staff_Admin/EditPesanan";
import LaporanPenjualan from "./pages/Staff_Admin/LaporanPenjualan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path='/History' element={<History />} />
        <Route path='/Etalase' element={<Etalase />} />
        <Route path='/Checkout' element={<Checkout />} />
        <Route path='/Checkout2' element={<Checkout2 />} />
        
        <Route path='/DashboardAdmin' element={<DashboardAdmin />} />
        <Route path='/Transaksi' element={<Transaksi />} />
        <Route path='/EtalaseAdmin' element={<EtalaseAdmin />} />
        <Route path="/ManajemenPengguna" element={<ManajemenPengguna />} />
        <Route path="/ManajemenPesanan" element={<ManajemenPesanan />} />
        <Route path="/EditPesanan/:id" element={<EditPesanan />} />
        <Route path="/LaporanPenjualan" element={<LaporanPenjualan />} />
      </Routes>
    </Router>
  );
}

export default App;
