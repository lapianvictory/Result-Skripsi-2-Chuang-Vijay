import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (
      email === "adminfrozen3000@adminfrozen.co.id" &&
      password === "30003000"
    ) {
      navigate("/DashboardAdmin");
      return;
    }

    try {
      const response = await fetch(
        "https://vjay-chuang.vercel.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
        const userId = decodedToken.id;
        localStorage.setItem("userId", userId);
        navigate("/Dashboard");
      }
    } catch (err) {
      setError("Terjadi kesalahan, coba lagi nanti");
    }
  };

  return (
    <div>
      <header className="bg-blue-900 p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">
          SELAMAT DATANG DI SISTEM PENJUALAN DAN PEMESANAN IKAN BEKU
        </h1>
      </header>
      <main className="flex justify-center items-center h-screen">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">
            LOGIN ATAU DAFTAR UNTUK MELANJUTKAN
          </h2>
          <p className="text-gray-700">
            Silakan masukkan Email dan Password Anda untuk mengakses situs ini
          </p>
        </div>
        <div className="w-1/3 bg-blue-700 p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-4">
            <i className="fas fa-user-circle text-6xl mb-2" />
            <h3 className="text-lg">Silakan Login</h3>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-gray-400 text-black placeholder-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 rounded bg-gray-400 text-black placeholder-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 text-right">
              <a href="/forgot-password" className="text-sm hover:underline">
                Lupa Password?
              </a>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full p-2 rounded bg-gray-400 text-black"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm">
                Belum punya akun?{" "}
                <Link to="/register" className="hover:underline">
                  Daftar
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
