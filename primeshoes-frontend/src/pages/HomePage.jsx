import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Card, Button } from 'flowbite-react';
import { fetchProducts } from '../redux/slices/productSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  // Produtos em destaque (os 4 produtos mais bem avaliados)
  const featuredProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  
  // Novos produtos (os 4 produtos mais recentes)
  const newProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  
  return (
    <div>
      {/* Hero Section */}
      <div className="w-full h-[500px] mb-12">
        <Carousel>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white relative">
            <img 
              src="/banner1.jpg" 
              alt="Banner 1" 
              className="w-full h-full object-cover absolute inset-0" 
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="z-10 text-center px-4 max-w-2xl">
              <h2 className="text-4xl font-bold text-white mb-4">Novos Estilos para o Verão</h2>
              <p className="text-xl text-white/90 mb-6">Descubra nossa nova coleção com até 30% de desconto.</p>
              <Link to="/products">
                <Button gradientDuoTone="purpleToBlue" size="xl">
                  Comprar Agora
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white relative">
            <img 
              src="/banner2.jpg" 
              alt="Banner 2" 
              className="w-full h-full object-cover absolute inset-0" 
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="z-10 text-center px-4 max-w-2xl">
              <h2 className="text-4xl font-bold text-white mb-4">Exclusivo para Membros</h2>
              <p className="text-xl text-white/90 mb-6">Descontos exclusivos para clientes cadastrados.</p>
              <Link to="/register">
                <Button gradientDuoTone="purpleToBlue" size="xl">
                  Cadastre-se Agora
                </Button>
              </Link>
            </div>
          </div>
        </Carousel>
      </div>
      
      {/* Categorias em Destaque */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categorias em Destaque</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/products?category=1" className="relative rounded-lg overflow-hidden h-40 group">
            <img src="/category1.jpg" alt="Tênis Esportivos" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">Tênis Esportivos</h3>
            </div>
          </Link>
          <Link to="/products?category=2" className="relative rounded-lg overflow-hidden h-40 group">
            <img src="/category2.jpg" alt="Tênis Casuais" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">Tênis Casuais</h3>
            </div>
          </Link>
          <Link to="/products?category=3" className="relative rounded-lg overflow-hidden h-40 group">
            <img src="/category3.jpg" alt="Tênis de Corrida" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">Tênis de Corrida</h3>
            </div>
          </Link>
          <Link to="/products?category=4" className="relative rounded-lg overflow-hidden h-40 group">
            <img src="/category4.jpg" alt="Sandálias" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">Sandálias</h3>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Produtos em Destaque */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
          <Link to="/products" className="text-blue-600 hover:underline">Ver todos</Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                imgSrc={product.imageUrl || "https://via.placeholder.com/300"}
                className="max-w-sm"
              >
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                  {product.name}
                </h5>
                <div className="flex items-center mt-2.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-300'
                          : 'text-gray-300'
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
            ))}
          </div>
        )}
      </section>
      
      {/* Novos Produtos */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Novos Produtos</h2>
          <Link to="/products" className="text-blue-600 hover:underline">Ver todos</Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <Card
                key={product.id}
                imgSrc={product.imageUrl || "https://via.placeholder.com/300"}
                className="max-w-sm"
              >
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Novo
                </div>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                  {product.name}
                </h5>
                <div className="flex items-center mt-2.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-300'
                          : 'text-gray-300'
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
            ))}
          </div>
        )}
      </section>
      
      {/* Banner Promocional */}
      <section className="mb-12">
        <div className="w-full h-60 bg-blue-600 rounded-lg relative overflow-hidden">
          <img 
            src="/promo-banner.jpg" 
            alt="Promoção" 
            className="w-full h-full object-cover opacity-25" 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <h2 className="text-3xl font-bold mb-2 text-center">Promoção de Inverno</h2>
            <p className="text-xl mb-6 text-center">Aproveite descontos de até 50% em calçados selecionados</p>
            <Link to="/promotions">
              <Button gradientDuoTone="purpleToBlue" size="lg">
                Ver Ofertas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}