import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate,useParams } from 'react-router-dom';
import './index.css';
import Header from "../Header";

const url = "https://vjay-chuang.vercel.app";
// const url = "http://localhost:5000";

export default function ManajemenPengguna() {
  const navigate = useNavigate()  
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async (searchTerm) => {
    try {
      const response = await fetch(`${url}/orders/detailed${searchTerm ? `?search=${searchTerm}` : ""}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching Orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${url}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  useEffect(() => {
    fetchOrders(searchTerm);
    fetchProducts();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/orders/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchOrders();
        alert("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (item) => {
    console.log(item);
    
    navigate(`/EditPesanan/${item._id}`)
    // setSelectedOrder(product);
    // setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setSelectedOrder(null);
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
      let productToUpdate = { ...selectedOrder };
      
      if (selectedOrder.image instanceof File) {
        const compressedBlob = await compressImage(selectedOrder.image);
        const base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(compressedBlob);
        });
        productToUpdate.image = base64Image;
      }
  
      const response = await fetch(`${url}/orders/${selectedOrder._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToUpdate),
      });
      
      if (response.ok) {
        fetchOrders();
        setIsEdit(false);
        setSelectedOrder(null);
        alert("User updated successfully");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await fetch(`${url}/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchOrders();
        alert("Status updated successfully");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAddProduct = () => {
    if (!selectedOrder) {
      // Initialize selectedOrder with empty products array if none exists
      setSelectedOrder({
        ...selectedOrder,
        products: []
      });
    }
    setIsAdd(true);
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
      <Header/>
      <div className="line" />
      <div className="flex justify-between items-center mb-8">
        <h2 className="titlepage">Etalase</h2>
      </div>
      <div className="overflow-auto w-full"> 
        <div className="header-title">
          <h3 className="title">Show</h3>
          <input className="input-angka" />
          <h3 className="title" id="entries">Entries</h3>
          <h3 className="title">Search</h3>
          <input className="input-search" onChange={(event) => setSearchTerm(event.target.value)} />
          <button onClick={() => 
    setIsAdd(true)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Nomor</th>
              <th className="border px-4 py-2">Nama Pemesan</th>
              <th className="border px-4 py-2">Alamat</th>
              <th className="border px-4 py-2">Nomor Telp</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Metode Pembayaran</th>
              <th className="border px-4 py-2">Metode Pengiriman</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Pesanan</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
          {orders && orders?.map((item, index) => (
            <tr key={item.nomor}>
              <td className="border px-4 py-2">{index+1}</td>
              {isEdit && selectedOrder && selectedOrder._id === item._id ? (
                <>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={selectedOrder.userId.username}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          userId: {
                            ...selectedOrder.userId,
                            username: e.target.value
                          }
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={selectedOrder.address}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          address: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={selectedOrder.phoneNumber}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9]/g, '');
                        setSelectedOrder({
                          ...selectedOrder,
                          phoneNumber: numericValue,
                        });
                      }}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={selectedOrder.userId.email}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          email: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={selectedOrder.metodePembayaran}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          metodePembayaran: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={selectedOrder.metodePengiriman}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          metodePengiriman: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={selectedOrder.status}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          status: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <div className="space-y-1">
                      {/* {item?.products.map((item,index) => {
                        return (
                          <div key={index} className=" min-w-[300px] flex flex-col bg-white p-2 rounded-xl shadow-md border border-black/20">
                            <div className="flex flex-row"> */}
                              {/* {`${item.productId.name} x${item.quantity}`} */}
                              {/* <select className="w-full"
                              onChange={(e) => {
                                const selectedProduct = products.find((product) => product.name === e.target.value);
                                const updatedProducts = selectedOrder.products.map((product) => {
                                  if (product?.productId?._id === item?.productId?._id) {
                                    return {
                                      ...product,
                                      productId: selectedProduct,
                                    };
                                  }
                                  return product;
                                });
                                setSelectedOrder({
                                  ...selectedOrder,
                                  products: updatedProducts,
                                });
                              }}
                              >
                                {products?.map((product) => (
                                  <option key={product._id} value={product}>
                                    {`${product.name} - ${product.price}`}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        );
                      })} */}
                      {/* add product selection */}
                      {/* {isAdd && 
                          <div className=" min-w-[300px] flex flex-col bg-white p-2 rounded-xl shadow-md border border-black/20">
                            <div className="flex flex-row"><select className="w-full"
                        onChange={(e) => {
                          const selectedProduct = products.find((product) => product.name === e.target.value);
                          const updatedProducts = [...selectedOrder.products, {
                            productId: selectedProduct,
                            quantity: 1,
                            price: selectedProduct.price
                          }];
                          setSelectedOrder({
                            ...selectedOrder,
                            products: updatedProducts,
                          });
                        }}
                      >
                        {products?.map((product) => (
                          <option key={product._id} value={product.name}>
                            {`${product.name} - ${product.price}`}
                          </option>
                        ))}
                      </select>
                      </div>
                      </div>} */}
                            
                      {/* <button 
                        className="bg-sky-500 text-white px-4 !mt-2 py-1 w-full rounded-lg" 
                        onClick={handleAddProduct}
                      >
                        + Add Product
                      </button> */}
                      <div className="space-y-1">
                  {item?.products.map((item,index) => {
                    return (
                      <div key={index} className="flex flex-col bg-white p-2 rounded-xl shadow-md border border-black/20 min-w-[200px]">
                        <p className="font-bold">{`${item?.productId?.name} x${item?.quantity}`}</p>
                        <p>{`Rp ${item?.productId?.price.toLocaleString('id-ID')}`}</p>

                      </div>
                    );
                  })}  
                  <div className="flex flex-col bg-white p-2 rounded-xl shadow-md border border-black/20 font-bold">
                    <p>{`Total: Rp ${item.total.toLocaleString('id-ID')}`}</p>
                  </div>  
                  </div>  
                    </div>
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
                <TableCell>{item.userId?.username}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.userId?.email}</TableCell>
                <TableCell>{item.metodePembayaran}</TableCell>
                <TableCell>{item.metodePengiriman}</TableCell>
                <TableCell>
                <select 
                  onChange={(e) => handleUpdateStatus(item._id, e.target.value)}
                  value={item.status}
                  className="p-1 rounded-md"
                  style={{
                    backgroundColor: 
                      item.status === "pending" ? "#FEF3C7" :    // Warm yellow
                      item.status === "accepted" ? "#BFDBFE" :    // Light blue
                      item.status === "canceled" ? "#FEE2E2" :    // Light red
                      item.status === "shipped" ? "#D1FAE5" :     // Light green
                      item.status === "delivered" ? "#C7D2FE" :   // Light purple
                      item.status === "completed" ? "#A7F3D0" :   // Mint green
                      "white",
                      height: "100%"
                  }}
                >
                  <option value="pending" style={{backgroundColor: "#FEF3C7"}}>Pending</option>
                  <option value="accepted" style={{backgroundColor: "#BFDBFE"}}>Accepted</option>
                  <option value="canceled" style={{backgroundColor: "#FEE2E2"}}>Canceled</option>
                  <option value="shipped" style={{backgroundColor: "#D1FAE5"}}>Shipped</option>
                  <option value="delivered" style={{backgroundColor: "#C7D2FE"}}>Delivered</option>
                  <option value="completed" style={{backgroundColor: "#A7F3D0"}}>Completed</option>
                </select>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                  {item?.products.map((item,index) => {
                    return (
                      <div key={index} className="flex flex-col bg-white p-2 rounded-xl shadow-md border border-black/20 min-w-[200px]">
                        <p className="font-bold">{`${item?.productId?.name} x${item?.quantity}`}</p>
                        <p>{`Rp ${item?.productId?.price.toLocaleString('id-ID')}`}</p>

                      </div>
                    );
                  })}  
                  <div className="flex flex-col bg-white p-2 rounded-xl shadow-md border border-black/20 font-bold">
                    <p>{`Total: Rp ${item.total.toLocaleString('id-ID')}`}</p>
                  </div>  
                  </div>             
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

;
