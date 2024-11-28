import React from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';
import Header from "../Header";

function Transaksi() {
  const navigate = useNavigate();

  const navigasiDashboardAdmin = () => {
    navigate('/DashboardAdmin'); // Navigasi ke halaman transaksi
  };
  const navigasiEtalaseAdmin = () => {
    navigate('/EtalaseAdmin'); // Navigasi ke halaman transaksi
  };
  return (
    <div class="background">
      <Header/>
      <div className="line" />
      <h2 class="titlepage">Dashboard</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-gray-300 text-black p-4 rounded">
          <div class="flex items-center space-x-2">
            <i class="fas fa-box fa-2x"></i>
            <div>
              <h3 class="text-lg font-bold">Jumlah Produk</h3>
            </div>
          </div>
        </div>
        <div class="bg-gray-300 text-black p-4 rounded">
          <div class="flex items-center space-x-2">
            <i class="fas fa-dollar-sign fa-2x"></i>
            <div>
              <h3 class="text-lg font-bold">Pendapatan / Hari ini</h3>
              <p>16.483.000Rp</p>
            </div>
          </div>
        </div>
        <div class="bg-gray-300 text-black p-4 rounded">
          <div class="flex items-center space-x-2">
            <i class="fas fa-truck fa-2x"></i>
            <div>
              <h3 class="text-lg font-bold">Transaksi COD</h3>
              <p>18.295.000Rp</p>
            </div>
          </div>
        </div>
        <div class="bg-gray-300 text-black p-4 rounded">
          <div class="flex items-center space-x-2">
            <i class="fas fa-times-circle fa-2x"></i>
            <div>
              <h3 class="text-lg font-bold">Transaksi Cancelled</h3>
              <p>4 Cancelled</p>
            </div>
          </div>
        </div>
        <div class="bg-gray-300 text-black p-4 rounded">
          <div class="flex items-center space-x-2">
            <i class="fas fa-shopping-cart fa-2x"></i>
            <div>
              <h3 class="text-lg font-bold">In Cart</h3>
              <p>10</p>
            </div>
          </div>
        </div>
        <div class="bg-gray-300 text-black p-4 rounded">
          <div class="flex items-center space-x-2">
            <i class="fas fa-check-circle fa-2x"></i>
            <div>
              <h3 class="text-lg font-bold">Transaksi Selesai</h3>
              <p>13 Sukses</p>
            </div>
          </div>
        </div>
        <div class="bg-gray-300 text-black p-4 rounded col-span-3">
          <div class="flex items-center space-x-2">
            <i class="fas fa-comments fa-2x"></i>
            <div>
              <h3 class="text-lg font-bold">Customer</h3>
              <p>5 Comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaksi;
