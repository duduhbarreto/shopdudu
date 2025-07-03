// src/components/product/ProductCard.jsx
import { Link } from 'react-router-dom';
import { Card, Badge } from 'flowbite-react';

const ProductCard = ({ product, showBadge = false }) => {
  return (
    <Card className="max-w-sm h-full">
      <div className="relative overflow-hidden group">
        <img
          src={product.imageUrl || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
        />
        {showBadge && (
          <div className="absolute top-2 right-2">
            <Badge color="info" className="font-medium">
              Novo
            </Badge>
          </div>
        )}
      </div>
      
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
        {product.name}
      </h5>
      
      <div className="flex items-center mt-2.5 mb-5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(product.rating) ? 'text-yellow-300' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
          {product.rating.toFixed(1)}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          R$ {product.price.toFixed(2)}
        </span>
        <Link
          to={`/product/${product.id}`}
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none"
        >
          Ver Detalhes
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;