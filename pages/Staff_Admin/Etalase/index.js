import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';
import Header from "../Header";

function EtalaseAdmin() {
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    price: "",
    image: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  
  // const handleAddProduct = () => {
  // }
  const handleDashboardAdmin = () => {
    // Anda bisa menambahkan logika untuk login di sini
    navigate('/DashboardAdmin'); // Arahkan ke halaman dashboard
  };
  const handleTransaksi = () => {
    // Anda bisa menambahkan logika untuk login di sini
    navigate('/Transaksi'); // Arahkan ke halaman dashboard
  };

  const items = [
    {
      nomor: 1,
      nama: "Ikan Tude",stok: 10,
      harga: "Rp. 10.000",
      gambar: "https://storage.googleapis.com/a1aa/image/vBvLqXalPO63IZJredUm16zn7Dz80rLQQiaeobYBH6Fr1ilTA.jpg",
    },
    {
      nomor: 2,
      nama: "Ikan Cakalang",stok: 15,
      harga: "Rp. 50.000",
      gambar: "https://storage.googleapis.com/a1aa/image/dpGzxcAONgJHHJH4i2pneZnAEMwhTQwweG0YMgywx53x1ilTA.jpg",
    },
    {
      nomor: 3,
      nama: "Ikan Deho",stok: 5,
      harga: "Rp. 43.000",
      gambar: "https://storage.googleapis.com/a1aa/image/HZfkHCmFUZyIIqxsGCeggnkn566kUlkmrtegluIjfz8lWLWOB.jpg",
    },
    {
      nomor: 4,
      nama: "Ikan Pani",stok: 8,
      harga: "Rp. 62.000",
      gambar: "https://storage.googleapis.com/a1aa/image/Cze70Y7cBixzcyw4KH0996TDFOeT2Tz7IhXUMiFdLIDv1ilTA.jpg",
    },
    {
      nomor: 5,
      nama: "Ikan Tongkol",stok: 12,
      harga: "Rp. 35.000",
      gambar: "https://storage.googleapis.com/a1aa/image/PHS3fDPiZU1TUSl06yuYJB8hjefGmO9y5evZS39ku6AyWLWOB.jpg",
    },
    {
      nomor: 6,
      nama: "Ikan Melalugis",stok: 3,
      harga: "Rp. 38.000",
      gambar: "https://storage.googleapis.com/a1aa/image/YOf5d8OB6ISJcijOqtBVWeGZ3GPqJOklEp3dJFeeRzZ6WLWOB.jpg",
    },
  ];

  //hit api get data "https://vjay-chuang.vercel.app/products" 
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://vjay-chuang.vercel.app/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://vjay-chuang.vercel.app/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchProducts();
        alert("Product deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setSelectedProduct(null);
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', 0.7);
      };
      img.src = URL.createObjectURL(file);
    });
  };
  
  const handleSave = async () => {
    try {
      let productToUpdate = { ...selectedProduct };
      
      if (selectedProduct.image instanceof File) {
        const compressedBlob = await compressImage(selectedProduct.image);
        const base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(compressedBlob);
        });
        productToUpdate.image = base64Image;
      }
  
      const response = await fetch(`https://vjay-chuang.vercel.app/products/${selectedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToUpdate),
      });
      
      if (response.ok) {
        fetchProducts();
        setIsEdit(false);
        setSelectedProduct(null);
        alert("Product updated successfully");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      let productToAdd = { ...newProduct };
      if (newProduct.image instanceof File) {
        const compressedBlob = await compressImage(newProduct.image);
        const base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(compressedBlob);
          ;
        })
        productToAdd.image = base64Image;
      }

      const response = await fetch("https://vjay-chuang.vercel.app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToAdd),
      });

      if (response.ok) {
        fetchProducts();
        setIsAdd(false);
        setNewProduct({
          name: "",
          stock: "",
          price: "",
          image: "",
        });
        setIsAdd(false);
        alert("Product added successfully");
      }else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  const TableCell = ({ children, className = "border px-4 py-2" }) => (
    <td className={className}>{children}</td>
  );
  
  // Create a separate ActionButtons component
  const ActionButtons = ({ onEdit, onDelete }) => (
    <div className="flex flex-col items-center space-y-2">
      <button 
        className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors" 
        onClick={onEdit}
      >
        <i className="fas fa-edit"></i>
      </button>
      <button 
        className="bg-red-500 w-full text-white px-4 py-2 rounded hover:bg-red-600 transition-colors" 
        onClick={onDelete}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );


  return (
    <div className="background">
      <Header />
      <div className="line" />
      <div className="flex justify-between items-center mb-8">
        <h2 className="titlepage">Etalase</h2>
      </div>
      <div className="overflow-x-auto w-full"> 
        <div className="header-title">
          <h3 className="title">Show</h3>
          <input className="input-angka" />
          <h3 className="title" id="entries">Entries</h3>
          <h3 className="title">Search</h3>
          <input className="input-search" />
          <button onClick={() => 
    setIsAdd(true)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Nomor</th>
              <th className="border px-4 py-2">Nama Item</th>
              <th className="border px-4 py-2">Stok</th>
              <th className="border px-4 py-2">Harga</th>
              <th className="border px-4 py-2">Gambar</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isAdd && (
              <tr>
                <td>
                  New product
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={`Rp ${Number(newProduct.price).toLocaleString('id-ID')}`}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, '');
                      setNewProduct({ 
                        ...newProduct, 
                        price: numericValue 
                      });
                    }}
                  />
                </td>
                <td className="border px-4 py-2 flex flex-col items-center space-y-2">
                  <div className="relative w-32 h-32">
                    <img 
                      src={newProduct.image instanceof File ? URL.createObjectURL(newProduct.image) : "null"} 
                      alt={"new-product-image"} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm">
                    <span>Choose Image</span>
                  <input
                    type="file"
                    accept="image/*"
                      className="hidden"
                    onChange={(e) =>{
                      const file = e.target.files[0];
                      setNewProduct({
                        ...newProduct,
                        image: file
                      })}
                    }
                  />
                  </label>
                  </td>
                  <td>
                    <div className="flex flex-col space-y-2">
                    <button
                    className="bg-blue-500 text-white font-semibold w-full px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => {
                        handleAddProduct();
                      }}
                    >
                      Submit
                      </button>
                    <button
                    className="bg-red-500 text-white font-semibold w-full px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    onClick={() => {
                        setNewProduct({
                          name: '',
                          stock: '',
                          price: '',
                          image: null
                        });
                        setIsAdd(false);
                      }}
                    >
                      Cancel
                      </button>
                      </div>
                  </td>
                  </tr>)}
          {products?.map((item, index) => (
            <tr key={item.nomor}>
              <td className="border px-4 py-2">{index+1}</td>
              {isEdit && selectedProduct && selectedProduct._id === item._id ? (
                <>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={selectedProduct.name}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={selectedProduct.stock}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          stock: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={`Rp ${Number(selectedProduct.price).toLocaleString('id-ID')}`}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9]/g, '');
                        setSelectedProduct({
                          ...selectedProduct,
                          price: numericValue,
                        });
                      }}
                    />
                  </td>

                  <td className="border px-4 py-2 flex flex-col items-center space-y-2">
                  <div className="relative w-32 h-32">
                    <img 
                      src={selectedProduct.image instanceof File ? URL.createObjectURL(selectedProduct.image) : item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm">
                    <span>Choose Image</span>
                    <input
                      name="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setSelectedProduct({
                            ...selectedProduct,
                            image: file
                          });
                        }
                      }}
                    />
                  </label>
                </td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-col items-center space-y-2">
                      <button className="bg-blue-500 text-white px-4 py-2 w-full rounded" onClick={() => handleSave()}>
                        Save
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 w-full rounded" onClick={() => handleCancel()}>
                        Cancel
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{`Rp ${Number(item.price).toLocaleString('id-ID')}`}</TableCell>

                <TableCell className="flex justify-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="gambar hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </TableCell>
                <TableCell>
                  <ActionButtons 
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDelete(item._id)}
                  />
                </TableCell>
              </>
              )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EtalaseAdmin;
