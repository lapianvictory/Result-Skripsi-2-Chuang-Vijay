import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';
import { useParams } from 'react-router-dom';
import Header from "../Header";

const url = "https://vjay-chuang.vercel.app";

export default function LaporanPenjualan() {
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

      </div>
    </div>
  );
}
