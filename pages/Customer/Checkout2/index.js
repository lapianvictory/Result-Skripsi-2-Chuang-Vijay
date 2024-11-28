import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const Checkout2 = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  const nomorRekeningBank = "9576845632";
  const nomorWhatsApp = "081390901212";

  const handleLogout = () => {
    // Menghapus semua data sesi pengguna
    localStorage.clear();

    // Arahkan ke halaman login dan hapus riwayat
    navigate("/", { replace: true });
  };

  // Mengambil data yang dikirim dari halaman Checkout
  const { paymentOption, shippingOption, totalPrice, orderId, shippingCost } =
    state || {};

  const fetchDetailProduk = async (productId) => {
    try {
      const response = await fetch(
        `https://vjay-chuang.vercel.app/products/${productId}`
      );

      const dataProduk = await response.json();
      return dataProduk;
    } catch (error) {
      console.error("Error saat mengambil detail produk:", error);
    }
  };

  useEffect(() => {
    const fetchPesanan = async () => {
      try {
        const response = await fetch("https://vjay-chuang.vercel.app/orders");
        if (response.ok) {
          const data = await response.json();
          const pesananUser = data.filter(
            (pesanan) => pesanan.userId === userId
          );

          const updatedOrders = await Promise.all(
            pesananUser.map(async (pesanan) => {
              // Tambahkan detail produk
              pesanan.products = await Promise.all(
                pesanan.products.map(async (produk) => {
                  const detailProduk = await fetchDetailProduk(
                    produk.productId
                  );
                  return {
                    ...produk,
                    name: detailProduk?.name || "Produk tidak ditemukan",
                    image: detailProduk?.image || "",
                    price: detailProduk?.price || 0,
                    total: (detailProduk?.price || 0) * produk.quantity,
                  };
                })
              );

              // Hitung total biaya pesanan
              pesanan.total =
                pesanan.products.reduce(
                  (sum, produk) => sum + produk.total,
                  0
                ) + pesanan.ongkir;

              return pesanan;
            })
          );

          setOrders(updatedOrders);
        }
      } catch (error) {
        console.error("Error saat mengambil pesanan:", error);
      }
    };

    fetchPesanan();
  }, [userId]);

  return (
    <div className="checkout-container">
      <header className="header">
        <div className="header-content">
          <h1 className="title-page">
            Sistem Pemesanan dan Penjualan Ikan Beku
          </h1>
          <nav className="header-nav">
            <a href="/Dashboard">Beranda</a>
            <a href="/History">Riwayat</a>
            <a href="/Etalase">Etalase</a>
            <a href="/Cart">
              <i className="fas fa-shopping-cart cart-icon"></i>
            </a>
            <a href="/Profile">
              <i className="fas fa-user-circle user-icon"></i>
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

      <div className="main-content">
        {orders.map((pesanan) => (
          <div key={pesanan._id} className="order-container">
            <h2>ID Pesanan: {pesanan._id}</h2>
            <div className="order-table">
              <div className="order-header-row">
                <div>Gambar Produk</div>
                <div>Nama Produk</div>
                <div>Kuantitas</div>
                <div>Harga (Rp)</div>
                <div>Total (Rp)</div>
              </div>

              {pesanan.products.map((produk, index) => (
                <div key={index} className="order-row">
                  <div className="image-product">
                    <img
                      alt={`Gambar dari ${produk.name}`}
                      className="img-product"
                      src={produk.image}
                    />
                  </div>
                  <div>{produk.name}</div>
                  <div>{produk.quantity}</div>
                  <div>
                    {produk.price ? produk.price.toLocaleString() : "0"}
                  </div>
                  <div>
                    {produk.total ? produk.total.toLocaleString() : "0"}
                  </div>
                </div>
              ))}

              <div className="summary-section">
                <div className="summary-row">
                  <span className="entity">Ongkos Kirim</span>
                  <span className="entity">Total Biaya</span>
                </div>
                <div className="summary-row-values">
                  <div>
                    Rp. {pesanan.ongkir ? pesanan.ongkir.toLocaleString() : "0"}
                  </div>
                  <div>
                    Rp. {pesanan.total ? pesanan.total.toLocaleString() : "0"}
                  </div>
                </div>
              </div>

              <div className="payment-section">
                <div className="payment-header">Metode Pembayaran</div>
                <text className="header-data" id="metode-pembayaran">
                  {pesanan.metodePembayaran}
                </text>
                <div className="header-data">
                  {(() => {
                    if (pesanan.metodePembayaran === "Bank Transfer") {
                      return (
                        <>
                          <div>Rekening Bank: {nomorRekeningBank}</div>
                          <div>
                            Silakan lakukan transfer ke rekening ini atas nama:{" "}
                            <b>
                              <i>Chuang Jonathan</i>
                            </b>
                          </div>
                          <div>WhatsApp: {nomorWhatsApp}</div>
                        </>
                      );
                    } else if (pesanan.metodePembayaran === "COD") {
                      return <div>WhatsApp: {nomorWhatsApp}</div>;
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout2;
