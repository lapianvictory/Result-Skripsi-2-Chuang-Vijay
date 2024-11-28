import React from "react";

const Sidebar = () => {
    return (
        <div className="w-1/4 bg-blue-800 h-screen p-4">
            <h1 className="text-lg font-bold mb-8">FORM ADMIN</h1>
            <ul>
                <li className="mb-4"><a href="#" className="block py-2 px-4 bg-blue-700 rounded">Dashboard</a></li>
                <li className="mb-4"><a href="#" className="block py-2 px-4 bg-blue-700 rounded">Transaksi</a></li>
                <li className="mb-4"><a href="#" className="block py-2 px-4 bg-blue-700 rounded">Etalase</a></li>
                <li className="mb-4"><a href="#" className="block py-2 px-4 bg-blue-700 rounded">Laporan penjualan</a></li>
            </ul>
        </div>
    );
};

const Navbar = () => {
    return (
        <nav>
            <ul className="flex space-x-4">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Testimonial</a></li>
                <li><a href="#" className="hover:underline">History</a></li>
                <li><a href="#" className="hover:underline">Etalase</a></li>
            </ul>
        </nav>
    );
};

const Form = () => {
    return (
        <form>
            <div className="mb-4">
                <label htmlFor="id_transaksi" className="block mb-2">ID Transaksi</label>
                <input type="text" id="id_transaksi" className="w-full p-2 rounded bg-gray-200 text-black" />
            </div>
            <div className="mb-4">
                <label htmlFor="tanggal" className="block mb-2">Tanggal</label>
                <input type="date" id="tanggal" className="w-full p-2 rounded bg-gray-200 text-black" />
            </div>
            <div className="mb-4">
                <label htmlFor="nama_pelanggan" className="block mb-2">Nama Pelanggan</label>
                <input type="text" id="nama_pelanggan" className="w-full p-2 rounded bg-gray-200 text-black" />
            </div>
            <div className="mb-4">
                <label htmlFor="jenis_ikan" className="block mb-2">Jenis Ikan</label>
                <input type="text" id="jenis_ikan" className="w-full p-2 rounded bg-gray-200 text-black" />
            </div>
            <div className="mb-4">
                <label htmlFor="jumlah" className="block mb-2">Jumlah (Kg)</label>
                <input type="number" id="jumlah" className="w-full p-2 rounded bg-gray-200 text-black" />
            </div>
            <div className="flex space-x-4">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Simpan</button>
                <button type="reset" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Batal</button>
            </div>
        </form>
    );
};

const FormAdmin = () => {
    return (
        <div className="bg-blue-900 text-white flex">
            <Sidebar />
            <div className="w-3/4 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Tambah item</h2>
                    <Navbar />
                </div>
                <Form />
            </div>
        </div>
    );
};

export default FormAdmin;
