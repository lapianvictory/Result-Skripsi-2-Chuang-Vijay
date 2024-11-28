import React from "react";

function TransaksiBankingCash() {
  return (
    <div>
      <header className="bg-blue-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          WELCOME TO FROZEN FISH SALES AND ORDERING SYSTEM
        </h1>
        <nav className="space-x-4">
          <a className="hover:underline" href="#">
            {" "}
            Home{" "}
          </a>
          <a className="hover:underline" href="#">
            {" "}
            Testimonial{" "}
          </a>
          <a className="hover:underline" href="#">
            {" "}
            History{" "}
          </a>
          <a className="hover:underline" href="#">
            {" "}
            Etalase{" "}
          </a>
        </nav>
        <div className="text-2xl">
          <i className="fas fa-user-circle"> </i>
        </div>
      </header>
      <main className="p-8">
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div className="bg-blue-600 p-2 text-center">Gambar Produk</div>
          <div className="bg-blue-600 p-2 text-center">Nama</div>
          <div className="bg-blue-600 p-2 text-center">Kuantitas</div>
          <div className="bg-blue-600 p-2 text-center">Harga (Rp) / Kg</div>
          <div className="bg-blue-600 p-2 text-center">Total (Rp)</div>
        </div>
        <div className="grid grid-cols-5 gap-4 items-center mb-8">
          <div className="flex justify-center">
            <img
              alt="Image of Ikan Cakalang"
              className="rounded-full"
              height={100}
              src="https://storage.googleapis.com/a1aa/image/rSLyOLrvqpohNhzsG7lobe4qeltwePnAvj35w23wrzGs11TnA.jpg"
              width={100}
            />
          </div>
          <div className="text-center">Ikan Cakalang</div>
          <div className="text-center">2</div>
          <div className="text-center">50.000</div>
          <div className="text-center">100.000</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div />
          <div className="bg-white text-black p-4 rounded">
            <h2 className="text-center mb-4">Informasi Total Produk :</h2>
            <div className="bg-blue-600 text-white p-2 mb-2 text-center rounded">
              Sub Total: Rp.100.000
            </div>
            <div className="bg-blue-600 text-white p-2 mb-2 text-center rounded">
              Ongkor: Rp.10.000
            </div>
            <div className="bg-blue-600 text-white p-2 text-center rounded">
              Total: Rp.110.000
            </div>
          </div>
          <div className="bg-white text-black p-4 rounded">
            <h2 className="mb-4">Informasi Pembayaran</h2>
            <p>Metode Pembayaran</p>
            <p>No Rekening : .........</p>
            <p>No WhatsApp : .........</p>
            <p className="mt-4">Noted !</p>
            <p>
              Untuk mengkonfirmasi pembayaran langsung di No Wa yang tertera di
              atas atau "klick link below".
            </p>
            <hr className="mt-4" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default TransaksiBankingCash;
