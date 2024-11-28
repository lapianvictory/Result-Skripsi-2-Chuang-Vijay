import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Data yang dikirim:", formData);

    try {
      const response = await fetch(
        "https://vjay-chuang.vercel.app/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Status respons:", response.status);

      if (response.ok) {
        toast.success("Registrasi berhasil!", { position: "top-center" });
        setFormData({ username: "", email: "", password: "" });

        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        const errorData = await response.json();
        console.log("Pesan error:", errorData);
        toast.error(errorData.message || "Registrasi gagal", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Kesalahan jaringan:", error);
      toast.error("Terjadi kesalahan jaringan. Silakan coba lagi.", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">
          WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
        </h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/testimonial" className="hover:underline">
            Testimonial
          </Link>
          <Link to="/history" className="hover:underline">
            History
          </Link>
          <Link to="/etalase" className="hover:underline">
            Etalase
          </Link>
        </nav>
        <div className="text-white">
          <i className="fas fa-user-circle text-2xl" />
        </div>
      </header>
      <main className="flex justify-center items-center h-screen">
        <div className="bg-blue-700 p-10 rounded-lg shadow-lg text-center w-96">
          <div className="text-white mb-6">
            <i className="fas fa-user-circle text-6xl" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">
            Register your Account!
          </h2>
          <p className="text-white mb-6">
            Already have an account on this website?{" "}
            <button onClick={handleBack}>Log in</button>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Nama Lengkap"
              value={formData.username}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 bg-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 bg-gray-300 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 bg-gray-300 rounded"
            />
            <input
              type="Kategori"
              name="User"
              placeholder="Kategori"
              value={formData.kategori}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 bg-gray-300 rounded"
            />
            <button
              type="submit"
              className="block w-full p-3 bg-gray-300 rounded"
            >
              Daftar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Register;
