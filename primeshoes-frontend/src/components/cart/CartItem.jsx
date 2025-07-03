// src/components/cart/CartItem.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCartItem, removeCartItem } from '../../redux/slices/cartSlice';
import { Button, Card } from 'flowbite-react';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.productVariation.stock) return;
    
    setQuantity(newQuantity);
    
    const updatedItem = {
      id: item.id,
      quantity: newQuantity,
      subtotal: item.productVariation.product.price * newQuantity
    };
    
    dispatch(updateCartItem(updatedItem));
  };
  
  const handleRemove = () => {
    dispatch(removeCartItem(item.id));
  };
  
  return (
    <Card className="mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <img 
            src={item.productVariation.product.imageUrl || "https://via.placeholder.com/150"} 
            alt={item.productVariation.product.name} 
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        
        <div className="w-full md:w-3/4 md:pl-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{item.productVariation.product.name}</h3>
            <div className="text-sm text-gray-600 mb-2">
              <p>Cor: <span className="inline-block w-4 h-4 rounded-full ml-1" style={{ backgroundColor: item.productVariation.color }}></span></p>
              <p>Tamanho: {item.productVariation.size}</p>
              <p>Preço unitário: R$ {item.productVariation.product.price.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
            <div className="flex items-center mb-4 sm:mb-0">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)} 
                className="w-12 h-8 border-t border-b border-gray-300 text-center" 
                min="1" 
                max={item.productVariation.stock}
              />
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center"
              >
                +
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <p className="font-bold text-lg">
                R$ {(item.productVariation.product.price * quantity).toFixed(2)}
              </p>
              <Button color="failure" size="sm" onClick={handleRemove}>
                Remover
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;