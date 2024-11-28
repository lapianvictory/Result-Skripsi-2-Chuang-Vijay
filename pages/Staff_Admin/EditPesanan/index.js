import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';
import { useParams } from 'react-router-dom';
import Header from "../Header";

const url = "https://vjay-chuang.vercel.app";

export default function EditPesanan() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    userId: {
      _id: "",
      username: "",
      email: "",
      password: "", // Usually not shown or editable
      role: ""
    },
    products: [
      {
        productId: {
          _id: "",
          name: "",
          price: 0,
          description: "",
          stock: 0
        },
        quantity: 0
      }
    ],
    metodePengiriman: "",
    metodePembayaran: "",
    phoneNumber: "",
    norek: "",
    status: "",
    address: "",
    ongkir: 0,
    total: 0
  });

  const [newProduct, setNewProduct] = useState({
    productId: {
      _id: "",
      name: "",
      price: 0,
      description: "",
      stock: 0
    },
    quantity: 0
  });

  const { id } = useParams();

  const fetchOrder = async () => {
    const response = await fetch(`${url}/orders/${id}/detailed`)
    const data = await response.json();
    
    setFormData(data)
  }

  
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
    fetchOrder();
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Transform the data to match API format
    const payload = {
      userId: formData.userId._id,
      products: formData.products.map(product => ({
        productId: product.productId._id,
        quantity: product.quantity
      })),
      metodePengiriman: formData.metodePengiriman,
      metodePembayaran: formData.metodePembayaran,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      norek: formData.norek,
      ongkir: formData.ongkir,
      total: formData.total
    };
  
    try {
      const response = await fetch(`${url}/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Order updated successfully:', data);
        // You can add navigation or success message here
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };
  

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      setNewProduct(prev => ({
        ...prev,
        quantity: Number(value)
      }));
    } else if (name === 'newProduct') {
      const selectedProduct = products.find(p => p._id === value);
      setNewProduct(prev => ({
        ...prev,
        productId: selectedProduct
      }));
    }
  };
  
  

  const addProduct = (e) => {
    e.preventDefault();
    if (newProduct.productId.name && newProduct.quantity > 0) {
      setFormData((prevData) => ({
        ...prevData,
        products: [...prevData.products, newProduct]
      }));
      setNewProduct({
        productId: {
          _id: "",
          name: "",
          price: 0,
          description: "",
          stock: 0
        },
        quantity: 0
      });
    }
  };

  const deleteProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      products: updatedProducts
    }));
  };

  console.log(formData);
  
  return (
    <div className="background">
      <Header/>
      <div className="line" />
      <div className="container h-full mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-y-4 gap-x-8 p-4">
          {/* User Information */}
          <div className="text-white font-semibold flex flex-col gap-2 ">
            <label className="ml-2">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.userId.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userId: { ...formData.userId, username: e.target.value }
                })
              }
              className="input-field p-2 rounded-xl text-black"
            />
          </div>
          <div className="text-white font-semibold flex flex-col gap-2 ">
            <label className="ml-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.userId.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userId: { ...formData.userId, email: e.target.value }
                })
              }
              className="input-field p-2 rounded-xl text-black"
            />
          </div>
          
          {/* Other Information */}
          <div className="text-white font-semibold flex flex-col gap-2 ">
            <label className="ml-2">Metode Pengiriman:</label>
            <input
              type="text"
              name="metodePengiriman"
              value={formData.metodePengiriman}
              onChange={handleInputChange}
              className="input-field p-2 rounded-xl text-black"
            />
          </div>
          <div className="text-white font-semibold flex flex-col gap-2 ">
            <label className="ml-2">Metode Pembayaran:</label>
            <input
              type="text"
              name="metodePembayaran"
              value={formData.metodePembayaran}
              onChange={handleInputChange}
              className="input-field p-2 rounded-xl text-black"
            />
          </div>
          <div className="text-white font-semibold flex flex-col gap-2 ">
            <label className="ml-2">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="input-field p-2 rounded-xl text-black"
            />
          </div>
          <div className="text-white font-semibold flex flex-col gap-2 row-span-3 ">
            <label className="ml-2">Address:</label>
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="input-field p-2 rounded-xl text-black !h-full resize-none"
            />
          </div>
          <div className="text-white font-semibold flex flex-col gap-2 ">
            <label className="ml-2">Status:</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="input-field p-2 rounded-xl text-black"
            />
          </div>
          <div className="text-white font-semibold flex flex-col gap-2 ">
            <label className="ml-2">Total:</label>
            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={handleInputChange}
              className="input-field p-2 rounded-xl text-black"
            />
          </div>
          
          {/* Products Table */}
          <div className="col-span-2">
            <h3 className="text-white font-semibold">Products</h3>
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-gray-200">Product Name</th>
                  <th className="border-b border-gray-200">Price</th>
                  <th className="border-b border-gray-200">Quantity</th>
                  <th className="border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.products.map((product, index) => (
                  <tr key={index} className="text-black">
                    <td className="border-b border-gray-200">{product?.productId?.name}</td>
                    <td className="border-b border-gray-200">
                      {`Rp ${product?.productId?.price.toLocaleString('id-ID')}`}
                    </td>
                    <td className="border-b border-gray-200">{product?.quantity}</td>
                    <td className="border-b border-gray-200">
                      <button onClick={() => deleteProduct(index)} className="text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Add New Product */}
          <div className="col-span-2 grid grid-cols-4 gap-4">
            <h3 className="text-white font-semibold col-span-4">Add New Product</h3>
            <select 
              className="input-field p-2 rounded-xl text-black"
              name="newProduct"
              onChange={handleNewProductChange}
            >
              <option value="">Select a product</option>
              {products.map((item) => (
                <option value={item._id} key={item._id}>{item.name}</option>
              ))}
            </select>

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              defaultValue={newProduct.quantity}
              onChange={handleNewProductChange}
              className="input-field p-2 rounded-xl text-black"
            />
            <button onClick={addProduct} className="button bg-blue-500 rounded-xl">Add Product</button>
          <button type="submit" className="button bg-blue-500 rounded-xl">
            Save Changes
          </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
