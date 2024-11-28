import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Header from "../Header";

function DashboardAdmin() {
  const navigate = useNavigate();
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [todayProfit, setTodayProfit] = React.useState(0);
  const [CODProfit, setCODProfit] = React.useState(0);
  const [canceledOrders, setCanceledOrders] = React.useState(0);
  const [completedOrders, setCompletedOrders] = React.useState(0);

  const fetchTotalProducts = async () => {
    try {
      const response = await fetch(
        "https://vjay-chuang.vercel.app/products/total"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching total products:", error);
      return 0;
    }
  };

  const fetchTodayProfit = async () => {
    try {
      const response = await fetch(
        "https://vjay-chuang.vercel.app/orders/profit"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching today profit:", error);
      return 0;
    }
  };

  const fetchCODProfit = async () => {
    try {
      const response = await fetch(
        "https://vjay-chuang.vercel.app/orders/profit/COD"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching COD profit:", error);
      return 0;
    }
  };

  const fetchCanceledOrders = async () => {
    try {
      const response = await fetch(
        "https://vjay-chuang.vercel.app/orders/canceled"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching canceled orders:", error);
      return 0;
    }
  };

  const fetchCompletedOrders = async () => {
    try {
      const response = await fetch(
        "https://vjay-chuang.vercel.app/orders/completed"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching completed orders:", error);
      return 0;
    }
  };

  React.useEffect(() => {
    fetchTotalProducts().then(setTotalProducts);
    fetchTodayProfit().then(setTodayProfit);
    fetchCODProfit().then(setCODProfit);
    fetchCanceledOrders().then(setCanceledOrders);
    fetchCompletedOrders().then(setCompletedOrders);
  }, []);

  function formatToRupiah(number) {
    return `Rp ${number?.toLocaleString("id-ID")}`;
  }

  return (
    <div className="background">
      <Header />
      <div className="line" />
      <h2 className="titlepage">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-box fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Jumlah Produk</h3>
              <p>{totalProducts?.totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-dollar-sign fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Pendapatan / Hari ini</h3>
              <p>{formatToRupiah(todayProfit?.total)}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-truck fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Transaksi COD</h3>
              <p>{formatToRupiah(CODProfit?.total)}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-times-circle fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Transaksi Cancelled</h3>
              <p>{canceledOrders} Cancelled</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-black p-4 rounded">
          <div className="flex items-center space-x-2">
            <i className="fas fa-check-circle fa-2x"></i>
            <div>
              <h3 className="text-lg font-bold">Transaksi Selesai</h3>
              <p>{completedOrders} Sukses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
