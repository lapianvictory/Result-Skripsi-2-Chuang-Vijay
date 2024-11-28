import React from "react";

function Transfer() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-800 h-screen p-4">
        <h1 className="text-lg font-bold mb-6">FORM ADMIN</h1>
        <ul>
          <li className="mb-4">
            <a href="#" className="block py-2 px-4 bg-blue-700 rounded">
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">
              Transaksi
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">
              Etalase
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">
              Laporan penjualan
            </a>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="w-4/5 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center">
            <a href="#" className="mr-4">
              Home
            </a>
            <a href="#" className="mr-4">
              Testimonial
            </a>
            <a href="#" className="mr-4">
              History
            </a>
            <a href="#" className="mr-4">
              Etalase
            </a>
            <i className="fas fa-user-circle text-2xl" />
          </div>
        </div>
        <div className="bg-blue-800 p-4 rounded">
          <div className="flex justify-between items-center mb-4">
            <div>
              <label htmlFor="show-entries" className="mr-2">
                Show
              </label>
              <input
                type="text"
                id="show-entries"
                className="w-12 p-1 text-black"
              />
              <span>Entries</span>
            </div>
            <div>
              <label htmlFor="search" className="mr-2">
                Search:
              </label>
              <input type="text" id="search" className="p-1 text-black" />
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Transaction id</th>
                <th className="border px-4 py-2">Customer name</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Item</th>
                <th className="border px-4 py-2">Total Quantity</th>
                <th className="border px-4 py-2">(Rp) Total Bayar</th>
                <th className="border px-4 py-2">Bukti Transfer</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Checkout date</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">1.</td>
                <td className="border px-4 py-2">118</td>
                <td className="border px-4 py-2">Yeni Rumbayan</td>
                <td className="border px-4 py-2">Kel. Tanjung Merah</td>
                <td className="border px-4 py-2">08950447200</td>
                <td className="border px-4 py-2">Cakalang</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">60.000</td>
                <td className="border px-4 py-2">Bukti Transfer</td>
                <td className="border px-4 py-2">Packing</td>
                <td className="border px-4 py-2">Checkout date</td>
                <td className="border px-4 py-2">
                  <i className="fas fa-trash-alt" />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">2.</td>
                <td className="border px-4 py-2">198</td>
                <td className="border px-4 py-2">Ayin Dompeipen</td>
                <td className="border px-4 py-2">Jln. Wolter Monginsidi</td>
                <td className="border px-4 py-2">08123109282</td>
                <td className="border px-4 py-2">Deho</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">42.300</td>
                <td className="border px-4 py-2">Bukti Transfer</td>
                <td className="border px-4 py-2">On The Way</td>
                <td className="border px-4 py-2">Checkout date</td>
                <td className="border px-4 py-2">
                  <i className="fas fa-trash-alt" />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">3.</td>
                <td className="border px-4 py-2">120</td>
                <td className="border px-4 py-2">Natalia Langi</td>
                <td className="border px-4 py-2">Jln. Garuda Kawasan</td>
                <td className="border px-4 py-2">08377427888</td>
                <td className="border px-4 py-2">Melalugis</td>
                <td className="border px-4 py-2">2</td>
                <td className="border px-4 py-2">70.300</td>
                <td className="border px-4 py-2">Bukti Transfer</td>
                <td className="border px-4 py-2">Packing</td>
                <td className="border px-4 py-2">Checkout date</td>
                <td className="border px-4 py-2">
                  <i className="fas fa-trash-alt" />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">4.</td>
                <td className="border px-4 py-2">118</td>
                <td className="border px-4 py-2">Victory Lapian</td>
                <td className="border px-4 py-2">Alumbanua Baraki</td>
                <td className="border px-4 py-2">08377322511</td>
                <td className="border px-4 py-2">Tude</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">100.000</td>
                <td className="border px-4 py-2">Bukti Transfer</td>
                <td className="border px-4 py-2">Arrived</td>
                <td className="border px-4 py-2">Checkout date</td>
                <td className="border px-4 py-2">
                  <i className="fas fa-trash-alt" />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">5.</td>
                <td className="border px-4 py-2">118</td>
                <td className="border px-4 py-2">Noffre Lengkong</td>
                <td className="border px-4 py-2">Jln. CH Tahu</td>
                <td className="border px-4 py-2">Phone</td>
                <td className="border px-4 py-2">Tongkol</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">35.000</td>
                <td className="border px-4 py-2">Bukti Transfer</td>
                <td className="border px-4 py-2">Cancelled</td>
                <td className="border px-4 py-2">Checkout date</td>
                <td className="border px-4 py-2">
                  <i className="fas fa-trash-alt" />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <span>Showing 1 to 1 of 1 entries</span>
            <div>
              <button className="bg-blue-700 px-4 py-2 rounded">
                Previous
              </button>
              <button className="bg-blue-700 px-4 py-2 rounded">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
