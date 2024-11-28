import React from "react";

function COD() {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Admin Dashboard</title>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="styles.css" />
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-blue-800 w-64 min-h-screen p-4">
          <h2 className="text-2xl font-bold mb-6">FORM ADMIN</h2>
          <nav className="space-y-4">
            <a href="#" className="block py-2 px-4 bg-blue-700 rounded">
              Dashboard
            </a>
            <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">
              Transaksi
            </a>
            <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">
              Etalase
            </a>
            <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">
              Laporan Penjualan
            </a>
          </nav>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-6">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard COD</h1>
            <nav className="space-x-4">
              <a href="#" className="hover:underline">
                Home / Best Seller
              </a>
              <a href="#" className="hover:underline">
                Testimonial
              </a>
              <a href="#" className="hover:underline">
                History
              </a>
              <a href="#" className="hover:underline">
                Etalase
              </a>
            </nav>
          </header>
          {/* Search Bar */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <label htmlFor="showEntries" className="mr-2">
                Show
              </label>
              <input
                type="number"
                id="showEntries"
                className="text-black p-1 w-16"
              />
              <span>Entries</span>
            </div>
            <div>
              <label htmlFor="search" className="mr-2">
                Search:
              </label>
              <input type="text" id="search" className="text-black p-1" />
            </div>
          </div>
          {/* Data Table */}
          <div className="bg-white text-black rounded-lg shadow-md p-4">
            <table className="w-full border-collapse">
              <thead className="bg-gray-300">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Transaction Id</th>
                  <th className="p-2">Customer Name</th>
                  <th className="p-2">Address</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Item</th>
                  <th className="p-2">Total Quantity</th>
                  <th className="p-2">(Rp) Total Bayar</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Checkout Date</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-200">
                  <td className="p-2">1</td>
                  <td className="p-2">118</td>
                  <td className="p-2">Ayen Dompeipen</td>
                  <td className="p-2">Kel. Tanjung Merah</td>
                  <td className="p-2">089504479200</td>
                  <td className="p-2">Ikan Cakalang</td>
                  <td className="p-2">1</td>
                  <td className="p-2">10.000</td>
                  <td className="p-2">Ready for pickup</td>
                  <td className="p-2">2024-08-15 11:34:25</td>
                  <td className="p-2 text-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">
                      🗑️
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <p>Showing 1 to 1 of 1 entries</p>
              <div>
                <button className="bg-gray-500 text-white py-1 px-3 rounded-l">
                  Previous
                </button>
                <button className="bg-gray-500 text-white py-1 px-3 rounded-r">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default COD;
