// src/pages/CheckoutPage.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Label, TextInput, Select, Radio, Tabs } from 'flowbite-react';
import { toast } from 'react-toastify';
import { createOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items, cartId } = useSelector((state) => state.cart);
  
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipcode: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  
  // Calcular totais
  const subtotal = items.reduce((total, item) => total + item.subtotal, 0);
  const shipping = 15.90;
  const total = subtotal + shipping;
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, items, navigate]);
  
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    });
  };
  
  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Criar objeto de ordem para enviar para a API
    const orderData = {
      userId: user.id,
      totalPrice: total,
      items: items.map(item => ({
        productVariationId: item.productVariation.id,
        quantity: item.quantity,
        subtotal: item.subtotal
      })),
      shippingAddress,
      paymentMethod
    };
    
    dispatch(createOrder(orderData))
      .unwrap()
      .then((order) => {
        // Limpar carrinho após criar o pedido
        dispatch(clearCart());
        toast.success('Pedido realizado com sucesso!');
        navigate(`/order/${order.id}`);
      })
      .catch((error) => {
        toast.error('Erro ao finalizar pedido: ' + error);
      });
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="street" value="Rua" />
                  <TextInput
                    id="street"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="number" value="Número" />
                  <TextInput
                    id="number"
                    name="number"
                    value={shippingAddress.number}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="complement" value="Complemento" />
                <TextInput
                  id="complement"
                  name="complement"
                  value={shippingAddress.complement}
                  onChange={handleShippingChange}
                />
              </div>
              
              <div>
                <Label htmlFor="neighborhood" value="Bairro" />
                <TextInput
                  id="neighborhood"
                  name="neighborhood"
                  value={shippingAddress.neighborhood}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" value="Cidade" />
                  <TextInput
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state" value="Estado" />
                  <Select
                    id="state"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleShippingChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="zipcode" value="CEP" />
                <TextInput
                  id="zipcode"
                  name="zipcode"
                  value={shippingAddress.zipcode}
                  onChange={handleShippingChange}
                  required
                />
              </div>
            </form>
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold mb-4">Forma de Pagamento</h2>
            
            <Tabs>
              <Tabs.Item active title="Cartão de Crédito">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" value="Número do Cartão" />
                    <TextInput
                      id="cardNumber"
                      name="number"
                      value={cardInfo.number}
                      onChange={handleCardInfoChange}
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardName" value="Nome no Cartão" />
                    <TextInput
                      id="cardName"
                      name="name"
                      value={cardInfo.name}
                      onChange={handleCardInfoChange}
                      placeholder="NOME COMO ESTÁ NO CARTÃO"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry" value="Validade" />
                      <TextInput
                        id="cardExpiry"
                        name="expiry"
                        value={cardInfo.expiry}
                        onChange={handleCardInfoChange}
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvv" value="CVV" />
                      <TextInput
                        id="cardCvv"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardInfoChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              
              <Tabs.Item title="Boleto">
                <p className="mb-4">O boleto será gerado após a confirmação do pedido.</p>
                <p className="text-gray-600">O prazo de entrega começa a contar após a confirmação do pagamento.</p>
              </Tabs.Item>
              
              <Tabs.Item title="PIX">
                <p className="mb-4">O QR Code do PIX será gerado após a confirmação do pedido.</p>
                <p className="text-gray-600">O prazo de entrega começa a contar após a confirmação do pagamento.</p>
              </Tabs.Item>
            </Tabs>
          </Card>
        </div>
        
        <div>
          <Card>
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Itens ({items.length})</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-sm">
                      {item.quantity}x {item.productVariation.product.name}
                    </span>
                    <span className="text-sm">
                      R$ {item.subtotal.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>R$ {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button onClick={handleSubmit} gradientDuoTone="purpleToBlue" className="w-full">
              Finalizar Compra
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;