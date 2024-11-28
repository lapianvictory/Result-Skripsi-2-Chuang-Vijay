import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/DashboardAdmin' },
    // { label: 'Transaksi', path: '/Transaksi' },
    { label: 'Laporan Penjualan', path: '/EtalaseAdmin' },
    { label: 'Manajemen Pengguna', path: '/ManajemenPengguna' },
    { label: 'Manajemen Pesanan', path: '/ManajemenPesanan' },
    { label: 'Logout', path: '/' },
  ];

  return (
    <header className="header-navbar">
      <div className="header-title">
        <h3 className="title">FORM ADMIN - Edit Pesanan</h3>
      </div>
      <nav className="flex flex-row">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`button whitespace-nowrap ${item.label === 'Logout' ? 'bg-red-500' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
