import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Add your custom styles here

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentOption, setPaymentOption] = useState("");
  const [shippingOption, setShippingOption] = useState("");
  const [address, setAddress] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    setShippingCost(shippingOption === "delivery" ? 5000 : 0);
    if (shippingOption !== "delivery") setAddress("");
  }, [shippingOption]);

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const totalPrice = totalAmount + shippingCost;

  const handleCheckout = async () => {
    if (
      !paymentOption ||
      !shippingOption ||
      (shippingOption === "delivery" && !address)
    ) {
      alert("Please complete all options and provide an address.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please log in first.");
      navigate("/login");
      return;
    }

    const orderData = {
      userId,
      products: cart.map((product) => ({
        productId: product.productId,
        name: product.name,
        image: product.image,
        quantity: product.quantity,
        price: product.price,
        total: product.price * product.quantity,
      })),
      metodePengiriman: shippingOption === "delivery" ? "Delivery" : "Pickup",
      metodePembayaran: paymentOption === "banking" ? "Bank Transfer" : "COD",
      address: shippingOption === "delivery" ? address : "",
      ongkir: shippingCost,
      total: totalPrice,
      status: determineOrderStatus(paymentOption, shippingOption),
    };

    try {
      const response = await fetch("https://vjay-chuang.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        setOrderId(result.orderId);
        setModalMessage("Thank you for your order 😊🙏");
        setIsModalVisible(true);
        localStorage.removeItem("cart");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
      console.error("Error:", error);
    }
  };

  const determineOrderStatus = (payment, shipping) => {
    if (payment === "banking" && shipping === "delivery")
      return "Awaiting Payment & Shipping";
    if (payment === "cod" && shipping === "pickup")
      return "Awaiting Confirmation";
    return "Processing";
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigate("/Checkout2", {
      state: {
        orderId,
        paymentOption,
        shippingOption,
        totalPrice,
        shippingCost,
      },
    });
  };

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <h1>WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM</h1>
      </header>

      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="cart-header">
          <div>Image</div>
          <div>Name</div>
          <div>Quantity</div>
          <div>Price (Rp) / Box</div>
          <div>Total (Rp)</div>
        </div>

        {cart.map((product, index) => (
          <div key={index} className="cart-item">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div>{product.name}</div>
            <div>{product.quantity}</div>
            <div>Rp. {product.price.toLocaleString()}</div>
            <div>Rp. {(product.price * product.quantity).toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="summary-container">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>Rp. {totalAmount.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>Rp. {shippingCost.toLocaleString()}</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>Rp. {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="checkout-options">
          <h3>Checkout Options</h3>
          <div className="payment-method">
            <h4>Payment Method</h4>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="paymentOption"
                  value="banking"
                  onChange={(e) => setPaymentOption(e.target.value)}
                />
                Bank Transfer
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentOption"
                  value="cod"
                  onChange={(e) => setPaymentOption(e.target.value)}
                />
                Cash on Delivery (COD)
              </label>
            </div>
          </div>

          <div className="shipping-method">
            <h4>Shipping Method</h4>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="shippingOption"
                  value="pickup"
                  onChange={(e) => setShippingOption(e.target.value)}
                />
                Pickup
              </label>
              <label>
                <input
                  type="radio"
                  name="shippingOption"
                  value="delivery"
                  onChange={(e) => setShippingOption(e.target.value)}
                />
                Delivery
              </label>
            </div>

            {shippingOption === "delivery" && (
              <textarea
                placeholder="Delivery Address"
                className="address-textarea"
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            )}
          </div>

          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>
        </div>
      </div>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalMessage}</h2>
            <button onClick={closeModal} className="modal-button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
