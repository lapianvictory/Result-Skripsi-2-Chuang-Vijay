import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Etalase() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const incrementQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity < newCart[index].stock) {
      newCart[index].quantity += 1;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      setModalMessage(
        `Jumlah stok untuk ${newCart[index].name} adalah ${newCart[index].stock}`
      );
      setIsModalVisible(true);
    }
  };

  const decrementQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const removeProduct = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleCheckout = () => {
    navigate("/Checkout", {
      state: { cart },
    });
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage("");
  };

  return (
    <div>
      <header className="bg-blue-800 py-4" id="navbar">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">
            WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
          </h1>
          <nav className="space-x-4">
            <a href="/Dashboard" className="hover:underline">
              Home
            </a>
            <a href="/History" className="hover:underline">
              History
            </a>
            <text>Etalase</text>
            <a href="/Etalase">
              <i className="fas fa-shopping-cart cart-icon"></i>
            </a>
            <a href="/Checkout2">
              <i className="fas fa-box"></i>
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
      <main className="py-8">
        {cart.length === 0 ? (
          <p className="text-center text-lg">Keranjang Anda kosong.</p>
        ) : (
          <div className="flex flex-wrap justify-center">
            {cart.map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 m-4 rounded shadow-lg text-center"
              >
                <img
                  alt={`Image of ${product.name}`}
                  className="rounded-full"
                  height={150}
                  src={product.image}
                  width={150}
                />
                <h3 className="text-xl font-bold mt-4">{product.name}</h3>
                <p>Stok: {product.stock}Box</p>
                <p>Harga: Rp. {product.price} / 1 box</p>
                <p>Jumlah Ikan: {product.quantity} box</p>
                <div className="flex justify-center items-center mt-4">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-l"
                    onClick={() => decrementQuantity(index)}
                  >
                    -
                  </button>
                  <span className="px-4">{product.quantity}</span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-r"
                    onClick={() => incrementQuantity(index)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                  onClick={() => removeProduct(index)}
                >
                  Hapus Produk
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="text-center mt-8">
            <button
              className="bg-blue-600 text-white px-8 py-4 rounded"
              onClick={handleCheckout}
            >
              Lanjutkan ke Checkout
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <p className="text-xl font-semibold text-black-600">
              {modalMessage}
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
              onClick={closeModal}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Etalase;
