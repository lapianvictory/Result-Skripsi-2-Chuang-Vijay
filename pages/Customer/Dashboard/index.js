import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Dashboard() {
  const navigate = useNavigate();
  const menuProductRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // State untuk menyimpan data pesanan
  const [notification, setNotification] = useState(""); // State untuk notifikasi modal

  const handleLogout = () => {
    // Menghapus semua data sesi pengguna
    localStorage.clear();

    // Arahkan ke halaman login dan hapus riwayat
    navigate("/", { replace: true });
  };

  const handleEtalase = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Hitung jumlah produk ini yang sudah ada di keranjang
    const existingCartItem = storedCart.find(
      (item) => item.productId === product._id
    );
    const totalInCart = existingCartItem ? existingCartItem.quantity : 0;

    // Cek stok yang tersisa
    const remainingStock = product.stock - totalInCart;

    if (remainingStock <= 0) {
      // Tampilkan notifikasi jika stok habis atau tidak cukup
      setNotification(
        `Stok produk ikan ${product.name} habis! Tidak bisa menambahkan ke keranjang.`
      );
      return; // Hentikan eksekusi
    }

    // Tambahkan produk ke keranjang
    const productWithQuantity = {
      ...product,
      quantity: 1, // Set jumlah awal 1 untuk setiap penambahan
    };

    if (existingCartItem) {
      // Update jumlah jika produk sudah ada di keranjang
      existingCartItem.quantity += 1;
    } else {
      // Tambahkan produk baru ke keranjang
      const productWithId = {
        ...productWithQuantity,
        productId: product._id,
      };
      storedCart.push(productWithId);
    }

    // Simpan kembali keranjang ke localStorage
    localStorage.setItem("cart", JSON.stringify(storedCart));

    // Tampilkan notifikasi sukses
    setNotification(`Produk ${product.name} telah dimasukkan ke keranjang!`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://vjay-chuang.vercel.app/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch("https://vjay-chuang.vercel.app/orders"); // Ganti URL dengan endpoint API pesanan
        const data = await response.json();
        setOrders(data); // Set state dengan data pesanan
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchProducts();
    fetchOrders(); // Panggil API pesanan
  }, []);

  const scrollToMenuProduct = () => {
    if (menuProductRef.current) {
      menuProductRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getAffordableFishCount = () => {
    if (products.length === 0) return 0;
    const averagePrice =
      products.reduce((sum, product) => sum + product.price, 0) /
      products.length;
    const thresholdPrice = averagePrice * 0.85;
    return products.filter((product) => product.price < thresholdPrice).length;
  };

  const getUniqueSubscribersCount = () => {
    // Dapatkan semua userId yang ada di data pesanan
    const uniqueUserIds = new Set(orders.map((order) => order.userId));
    // Jumlah pelanggan unik adalah ukuran dari Set
    return uniqueUserIds.size;
  };

  return (
    <div>
      <header className="bg-blue-800 py-4" id="navbar">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">
            WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
          </h1>
          <nav className="space-x-4">
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="/History" className="hover:underline">
              History
            </a>
            <a
              href="#"
              className="hover:underline"
              onClick={scrollToMenuProduct}
            >
              Etalase
            </a>
            <a href="/Etalase">
              <i className="fas fa-shopping-cart cart-icon"></i>
            </a>
            <a href="/Checkout2">
              <i class="fas fa-box"></i>
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
      <main className="container mx-auto text-center py-16">
        <h2 className="text-4xl font-bold mb-4">
          Tersedia Ikan Frozen untuk Dipesan!
        </h2>
        <div className="header-explane">
          <h3 className="explanation">
            The New Fish Product with a best quality meat & affordable price for
            consumers. Enjoy the taste of the authentic food
          </h3>
        </div>
        <button
          className="bg-blue-700 text-white py-2 px-4 rounded-full mb-8"
          onClick={scrollToMenuProduct}
        >
          Choose your Product
        </button>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-blue-700 py-4 rounded">
            <p className="iklan">{orders.length}</p>
            <p className="iklan">Penjualan</p>
          </div>
          <div className="bg-blue-700 py-4 rounded">
            <p className="iklan">{products.length}</p>
            <p className="iklan">Jenis Ikan</p>
          </div>
          <div className="bg-blue-700 py-4 rounded">
            <p className="iklan">{getUniqueSubscribersCount()}</p>
            <p className="iklan">Berlangganan</p>
          </div>
          <div className="bg-blue-700 py-4 rounded">
            <p className="iklan">{getAffordableFishCount()} Produk</p>
            <p className="iklan">15% Lebih Murah</p>
          </div>
        </div>
      </main>

      {/* Modal Notifikasi */}
      {notification && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <p className="text-xl font-semibold text-black-600">
              {notification}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full"
              onClick={() => setNotification("")} // Close modal when clicked
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div ref={menuProductRef} id="header-produk">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="relative">
              <img
                alt={product.name}
                className="gambar-produk-ikan"
                height={100}
                src={product.image}
                width={100}
              />
              <h2 className="text-center mt-2">{product.name}</h2>
              <button
                className="block mx-auto mt-2 bg-blue-500 text-white py-1 px-4 rounded"
                onClick={() => handleEtalase(product)} // Pass the product here
              >
                Masukkan Keranjang
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
