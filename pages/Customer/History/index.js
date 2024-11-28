import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function History() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId"); // Ambil userId dari localStorage

  const handleLogout = () => {
    // Menghapus semua data sesi pengguna
    localStorage.clear();

    // Arahkan ke halaman login dan hapus riwayat
    navigate("/", { replace: true });
  };

  // Fungsi untuk memotong teks jika lebih panjang dari maxLength
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Fungsi untuk memformat tanggal menjadi lebih ramah pengguna
  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Fungsi untuk mengambil dan mengembalikan checkoutDate dari localStorage jika sudah ada
  const getCheckoutDateFromLocalStorage = (orderId) => {
    const checkoutDates =
      JSON.parse(localStorage.getItem("checkoutDates")) || {};
    return checkoutDates[orderId];
  };

  // Fungsi untuk menyimpan checkoutDate di localStorage
  const saveCheckoutDateToLocalStorage = (orderId, date) => {
    const checkoutDates =
      JSON.parse(localStorage.getItem("checkoutDates")) || {};
    checkoutDates[orderId] = date;
    localStorage.setItem("checkoutDates", JSON.stringify(checkoutDates));
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `https://vjay-chuang.vercel.app/products/${productId}`
      );
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://vjay-chuang.vercel.app/orders");
        if (response.ok) {
          const data = await response.json();
          const userOrders = data.filter((order) => order.userId === userId);

          console.log("Fetched orders:", userOrders); // Log untuk memeriksa data

          for (const order of userOrders) {
            // Cek apakah checkoutDate sudah ada di localStorage
            let checkoutDate = getCheckoutDateFromLocalStorage(order._id);

            // Jika tidak ada, anggap sebagai pesanan baru dan set checkoutDate ke waktu sekarang
            if (!checkoutDate) {
              const now = new Date();
              checkoutDate = formatDate(now);
              saveCheckoutDateToLocalStorage(order._id, checkoutDate); // Simpan di localStorage
            }

            // Tetapkan checkoutDate yang sudah ada atau yang baru dibuat
            order.checkoutDate = checkoutDate;

            // Ambil detail produk untuk setiap pesanan
            const productDetailsPromises = order.products.map(
              async (product) => {
                const productDetails = await fetchProductDetails(
                  product.productId
                );
                return { ...product, ...productDetails };
              }
            );

            // Tunggu hingga semua permintaan produk selesai
            order.products = await Promise.all(productDetailsPromises);
          }

          setOrders(userOrders);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="background">
      <header className="header-title">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">
            WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
          </h1>
          <nav className="space-x-4">
            <a href="/Dashboard" className="hover:underline">
              Home
            </a>
            <a href="#" className="hover:underline">
              History
            </a>
            <a href="#" className="hover:underline">
              Etalase
            </a>
            <a href="/Etalase">
              <i className="fas fa-shopping-cart cart-icon"></i>
            </a>
            <a href="/Checkout2">
              <i className="fas fa-user-circle" />
            </a>
            <button
              onClick={handleLogout}
              className="hover:underline text-white"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </nav>
        </div>
      </header>

      <div className="p-8 bg-blue-700 scrollable-container">
        <div className="grid grid-cols-7 gap-4 text-center text-lg font-semibold mb-4">
          <div className="bg-blue-500 p-2">#</div>
          <div className="bg-blue-500 p-2">Transaction ID</div>
          <div className="bg-blue-500 p-2">Items</div>
          <div className="bg-blue-500 p-2">Total Quantity</div>
          <div className="bg-blue-500 p-2">Total Payment (Rp)</div>
          <div className="bg-blue-500 p-2">Status</div>
          <div className="bg-blue-500 p-2">Checkout Date</div>
        </div>

        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={order._id}
              className="grid grid-cols-7 gap-4 items-center text-center mb-4"
            >
              <div className="border border-gray-400 p-2 text-center">
                {index + 1}.
              </div>
              <div className="border border-gray-400 p-2 text-center">
                {truncateText(order._id, 10)}
              </div>
              <div className="border border-gray-400 p-2 text-center">
                {order.products.map((product, idx) => (
                  <div key={idx}>
                    {product.name} (x{product.quantity})
                  </div>
                ))}
              </div>
              <div className="border border-gray-400 p-2 text-center">
                {order.products.reduce(
                  (total, product) => total + product.quantity,
                  0
                )}
              </div>
              <div className="border border-gray-400 p-2 text-center">
                {order.total.toLocaleString()}
              </div>
              <div className="border border-gray-400 p-2 text-center">
                {order.status}
              </div>
              <div className="border border-gray-400 p-2 text-center">
                {order.checkoutDate}
              </div>
            </div>
          ))
        ) : (
          <div className="border border-gray-400 p-2 text-center" colSpan="7">
            No order history found.
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
