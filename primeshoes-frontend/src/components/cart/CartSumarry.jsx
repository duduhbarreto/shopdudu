// src/components/cart/CartSummary.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';

const CartSummary = () => {
  const { items } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const subtotal = items.reduce((total, item) => total + item.subtotal, 0);
  const shipping = subtotal > 0 ? 15.90 : 0;
  const total = subtotal + shipping - discount;
  
  const handleApplyCoupon = () => {
    // Simulação de aplicação de cupom
    if (couponCode.toUpperCase() === 'PRIME10' && !discountApplied) {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      setDiscountApplied(true);
    }
  };
  
  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete</span>
          <span>R$ {shipping.toFixed(2)}</span>
        </div>
        {discountApplied && (
          <div className="flex justify-between text-green-600">
            <span>Desconto</span>
            <span>-R$ {discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Código do cupom"
            className="rounded-lg border flex-grow"
            disabled={discountApplied}
          />
          <Button
            onClick={handleApplyCoupon}
            size="sm"
            disabled={discountApplied}
          >
            Aplicar
          </Button>
        </div>
        {discountApplied && (
          <p className="text-sm text-green-600 mt-1">Cupom PRIME10 aplicado com sucesso!</p>
        )}
      </div>
      
      <Button
        as={Link}
        to="/checkout"
        gradientDuoTone="purpleToBlue"
        disabled={items.length === 0}
      >
        Finalizar Compra
      </Button>
    </Card>
  );
};

export default CartSummary;