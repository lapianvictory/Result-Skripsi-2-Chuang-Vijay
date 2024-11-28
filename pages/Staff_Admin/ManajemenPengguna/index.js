import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';
import Header from "../Header";


const url = "https://vjay-chuang.vercel.app";
// const url = "http://localhost:5000";
export default function ManajemenPengguna() {
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async (searchTerm = "") => {
    try {
      const response = await fetch(`${url}/users${searchTerm ? `?search=${searchTerm}` : ""}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(searchTerm);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchUsers();
        alert("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedUser(product);
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setSelectedUser(null);
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
      let productToUpdate = { ...selectedUser };
      
      if (selectedUser.image instanceof File) {
        const compressedBlob = await compressImage(selectedUser.image);
        const base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(compressedBlob);
        });
        productToUpdate.image = base64Image;
      }
  
      const response = await fetch(`${url}/users/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToUpdate),
      });
      
      if (response.ok) {
        fetchUsers();
        setIsEdit(false);
        setSelectedUser(null);
        alert("User updated successfully");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      let productToAdd = { ...newUser };
      if (newUser.image instanceof File) {
        const compressedBlob = await compressImage(newUser.image);
        const base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(compressedBlob);
          ;
        })
        productToAdd.image = base64Image;
      }

      const response = await fetch(`${url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToAdd),
      });

      if (response.ok) {
        fetchUsers();
        setIsAdd(false);
        setNewUser({
          username: "",
          email: "",
          role: "",
          image: "",
        });
        setIsAdd(false);
        alert("User added successfully");
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
      <Header/>
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
              {/* <th className="border px-4 py-2">Customer ID</th> */}
              <th className="border px-4 py-2">Nama Pengguna</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
          {users?.map((item, index) => (
            <tr key={item.nomor}>
              <td className="border px-4 py-2">{index+1}</td>
              {isEdit && selectedUser && selectedUser._id === item._id ? (
                <>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={selectedUser.username}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          username: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={selectedUser.email}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />
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
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
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
