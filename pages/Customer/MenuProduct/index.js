import React from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';

function MenuProduct() {
  const navigate = useNavigate();

  const handleEtalase = () => {
      navigate('/Etalase');
  };

  return (
    <div>
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render products dynamically */}
          {[
            { name: "Ikan Tude", src: "https://storage.googleapis.com/a1aa/image/wuiW2nXfnfq2PkJwWsbep1MjHo5ArD3V0Af4euOco6yBkSscC.jpg" },
            { name: "Ikan Cakalang", src: "https://storage.googleapis.com/a1aa/image/fzRofQech5ZnhJu5RJr6uf2OrbyqcB1wabYVnz8T2fP2kSscC.jpg" },
            { name: "Ikan Deho", src: "https://storage.googleapis.com/a1aa/image/wTWa69sVP74IEZUIrXLi949SHWA5aAC9GZ6ayZdkJPkIlY5E.jpg" },
            { name: "Ikan Melalugis", src: "https://storage.googleapis.com/a1aa/image/dKgR9lffC6sx6EebJoWMYphZpVxpkCrMNRpXv5fhbEzNSJWOB.jpg" },
            { name: "Ikan Tongkol", src: "https://storage.googleapis.com/a1aa/image/Dc5xhfPApyykOSFWd2bg0WJlxA9qiqspdOUYWLyL0kAPKxyJA.jpg" },
            { name: "Ikan Pani", src: "https://storage.googleapis.com/a1aa/image/kkivyXzlzgqSFNjkfTQySvCQwkTTmEges61esrTtJrPJpELnA.jpg" },
          ].map((product, index) => (
            <div key={index} className="relative">
              <img
                alt={product.name}
                className="w-full h-auto border-4 border-gray-300"
                height={150}
                src={product.src}
                width={200}
              />
              <h2 className="text-center mt-2">{product.name}</h2>
              <button 
                className="block mx-auto mt-2 bg-blue-500 text-white py-1 px-4 rounded"
                onClick={handleEtalase}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MenuProduct;
