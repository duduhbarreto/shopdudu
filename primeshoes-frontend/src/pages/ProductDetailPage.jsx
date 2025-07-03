import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Breadcrumb, Button, Tabs, Rating, Spinner, Badge } from 'flowbite-react';
import { toast } from 'react-toastify';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);
  const { cartId } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info('Faça login para adicionar produtos ao carrinho');
      navigate('/login');
      return;
    }
    
    if (!selectedVariation) {
      toast.warning('Selecione um tamanho e cor');
      return;
    }
    
    const itemData = {
      quantity,
      subtotal: selectedProduct.price * quantity,
      cartId,
      productVariationId: selectedVariation.id
    };
    
    dispatch(addToCart(itemData))
      .unwrap()
      .then(() => {
        toast.success('Produto adicionado ao carrinho');
      })
      .catch(() => {
        toast.error('Erro ao adicionar produto ao carrinho');
      });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }
  
  if (!selectedProduct) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>Produto não encontrado</p>
      </div>
    );
  }
  
  // Agrupar variações por tamanho
  const sizeGroups = selectedProduct.productVariations?.reduce((acc, variation) => {
    if (!acc[variation.size]) {
      acc[variation.size] = [];
    }
    acc[variation.size].push(variation);
    return acc;
  }, {}) || {};
  
  const sizes = Object.keys(sizeGroups).sort((a, b) => a - b);
  
  return (
    <div>
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/products">Produtos</Breadcrumb.Item>
        <Breadcrumb.Item href={`/products?category=${selectedProduct.category.id}`}>
          {selectedProduct.category.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{selectedProduct.name}</Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Imagem do Produto */}
        <div className="bg-white p-4 rounded-lg shadow">
          <img 
            src={selectedProduct.imageUrl || "https://via.placeholder.com/500"} 
            alt={selectedProduct.name} 
            className="w-full h-auto rounded-lg" 
          />
        </div>
        
        {/* Detalhes do Produto */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{selectedProduct.name}</h1>
          
          <div className="flex items-center mb-4">
            <Rating>
              {[...Array(5)].map((_, i) => (
                <Rating.Star 
                  key={i} 
                  filled={i < Math.floor(selectedProduct.rating)} 
                />
              ))}
            </Rating>
            <span className="ml-2 text-sm text-gray-500">
              {selectedProduct.rating.toFixed(1)} estrelas
            </span>
          </div>
          
          <div className="mb-4">
            <Badge color="purple" className="mr-2">{selectedProduct.category.name}</Badge>
            <Badge color="info">{selectedProduct.brand.name}</Badge>
          </div>
          
          <p className="text-4xl font-bold text-blue-600 mb-4">
            R$ {selectedProduct.price.toFixed(2)}
          </p>
          
          <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
          
          {/* Seleção de Tamanho */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Tamanho</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    if (sizeGroups[size]?.length > 0) {
                      setSelectedVariation(null);
                    }
                  }}
                  className={`w-12 h-12 flex items-center justify-center border rounded-md ${
                    selectedVariation?.size === Number(size)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Seleção de Cor */}
          {selectedVariation?.size && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Cor</h3>
              <div className="flex flex-wrap gap-2">
                {sizeGroups[selectedVariation.size]?.map((variation) => (
                  <button
                    key={variation.id}
                    onClick={() => setSelectedVariation(variation)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-md ${
                      selectedVariation.id === variation.id
                        ? 'border-blue-500 outline outline-2 outline-blue-500'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: variation.color }}
                    title={variation.color}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Quantidade */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Quantidade</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 h-10 border-t border-b border-gray-300 text-center"
                min="1"
                max={selectedVariation?.stock || 10}
              />
              <button
                onClick={() => setQuantity(Math.min(selectedVariation?.stock || 10, quantity + 1))}
                className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Botões de Ação */}
          <div className="flex gap-4">
            <Button color="blue" size="lg" onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </Button>
            <Button color="green" size="lg">
              Comprar Agora
            </Button>
          </div>
          
          {/* Disponibilidade */}
          {selectedVariation && (
            <p className="mt-4 text-sm">
              {selectedVariation.stock > 0 
                ? <span className="text-green-600">✓ Em estoque ({selectedVariation.stock} disponíveis)</span>
                : <span className="text-red-600">✗ Fora de estoque</span>
              }
            </p>
          )}
        </div>
      </div>
      
      {/* Abas de Informações */}
      <Tabs>
        <Tabs.Item title="Descrição">
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-700">{selectedProduct.description}</p>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Especificações">
          <div className="p-4 bg-white rounded-lg shadow">
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-semibold">Marca</td>
                  <td>{selectedProduct.brand.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">Categoria</td>
                  <td>{selectedProduct.category.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">Material</td>
                  <td>Couro sintético</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Garantia</td>
                  <td>30 dias</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Avaliações">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Avaliações de Clientes</h3>
              <Button color="blue" size="sm">Escrever Avaliação</Button>
            </div>
            
            {/* Lista de Avaliações */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <img 
                    src="https://ui-avatars.com/api/?name=João+Silva" 
                    alt="João Silva" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">João Silva</p>
                    <p className="text-sm text-gray-500">Há 2 dias</p>
                  </div>
                </div>
                <Rating>
                  <Rating.Star filled={true} />
                  <Rating.Star filled={true} />
                  <Rating.Star filled={true} />
                  <Rating.Star filled={true} />
                  <Rating.Star filled={false} />
                </Rating>
                <p className="mt-2">Ótimo tênis, muito confortável e bonito. Recomendo!</p>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <img 
                    src="https://ui-avatars.com/api/?name=Maria+Oliveira" 
                    alt="Maria Oliveira" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">Maria Oliveira</p>
                    <p className="text-sm text-gray-500">Há 1 semana</p>
                  </div>
                </div>
                <Rating>
                  <Rating.Star filled={true} />
                  <Rating.Star filled={true} />
                  <Rating.Star filled={true} />
                  <Rating.Star filled={false} />
                  <Rating.Star filled={false} />
                </Rating>
                <p className="mt-2">Produto bom, mas achei um pouco apertado. Recomendo comprar um número acima.</p>
              </div>
            </div>
          </div>
        </Tabs.Item>
      </Tabs>
    </div>
  );
}