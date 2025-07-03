// src/pages/CartPage.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { fetchCart } from '../redux/slices/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, cartId, loading, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isAuthenticated && cartId) {
      dispatch(fetchCart(cartId));
    }
  }, [dispatch, isAuthenticated, cartId]);
  
  if (!isAuthenticated) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>
        <p className="mb-6">Você precisa estar logado para visualizar seu carrinho.</p>
        <Button as={Link} to="/login" gradientDuoTone="purpleToBlue">
          Fazer Login
        </Button>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>
        <p className="text-red-500 mb-6">Erro ao carregar o carrinho: {error}</p>
        <Button onClick={() => dispatch(fetchCart(cartId))}>
          Tentar Novamente
        </Button>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>
        <p className="mb-6">Seu carrinho está vazio.</p>
        <Button as={Link} to="/products" gradientDuoTone="purpleToBlue">
          Continuar Comprando
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Seu Carrinho</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <div className="mt-4">
            <Button as={Link} to="/products" color="light">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Continuar Comprando
            </Button>
          </div>
        </div>
        
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;