import react from "react";

function DataCustomer() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-800 h-screen p-4">
        <h1 className="text-white text-lg mb-8">FORM ADMIN</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-white">
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-white">
                Transaksi
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-white">
                Etalase
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-white">
                Laporan penjualan
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="w-4/5 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Data Customer</h2>
          <div className="flex items-center">
            <label htmlFor="search" className="mr-2">
              Search:
            </label>
            <input
              type="text"
              id="search"
              className="p-1 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="entries" className="mr-2">
              Show
            </label>
            <select id="entries" className="p-1 border border-gray-300 rounded">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span>entries</span>
          </div>
        </div>
        <table className="min-w-full bg-white text-gray-800">
          <thead>
            <tr className="w-full bg-gray-200">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Customer ID</th>
              <th className="py-2 px-4 border">Customer Name</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border">1.</td>
              <td className="py-2 px-4 border">118</td>
              <td className="py-2 px-4 border">Yenni Rumbayan</td>
              <td className="py-2 px-4 border">Kel. Tanjung merah</td>
              <td className="py-2 px-4 border">08950447200</td>
              <td className="py-2 px-4 border text-center">
                <i className="fas fa-trash-alt" />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">2.</td>
              <td className="py-2 px-4 border">119</td>
              <td className="py-2 px-4 border">Ayen Dompeipen</td>
              <td className="py-2 px-4 border">Jln. Wolter Monginsidi</td>
              <td className="py-2 px-4 border">08123199282</td>
              <td className="py-2 px-4 border text-center">
                <i className="fas fa-trash-alt" />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">3.</td>
              <td className="py-2 px-4 border">120</td>
              <td className="py-2 px-4 border">Natalia Langi</td>
              <td className="py-2 px-4 border">Jln. Kawanaa</td>
              <td className="py-2 px-4 border">089504479200</td>
              <td className="py-2 px-4 border text-center">
                <i className="fas fa-trash-alt" />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">4.</td>
              <td className="py-2 px-4 border">121</td>
              <td className="py-2 px-4 border">Victory Lapian</td>
              <td className="py-2 px-4 border">Airmadidi bawah</td>
              <td className="py-2 px-4 border">087713227511</td>
              <td className="py-2 px-4 border text-center">
                <i className="fas fa-trash-alt" />
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">5.</td>
              <td className="py-2 px-4 border">118</td>
              <td className="py-2 px-4 border">Noffre Lengkong</td>
              <td className="py-2 px-4 border">Kel. Tanjung Merah</td>
              <td className="py-2 px-4 border">082291198776</td>
              <td className="py-2 px-4 border text-center">
                <i className="fas fa-trash-alt" />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <span>Showing 1 to 1 of 1 entries</span>
          <div>
            <button className="px-3 py-1 border border-gray-300 rounded">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataCustomer;
