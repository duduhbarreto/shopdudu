// src/pages/ProductsPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Tabs, Button, TextInput } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import ProductFilter from '../components/product/ProductFilter';
import ProductGrid from '../components/product/ProductGrid';
import { fetchProducts, searchProducts } from '../redux/slices/productSlice';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { products, filteredProducts, loading } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Extrair parâmetros da URL
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('category');
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  useEffect(() => {
    if (categoryId) {
      // Simular filtro por categoria
      const filtered = products.filter(product => product.category.id === parseInt(categoryId));
      // No mundo real, você provavelmente faria uma chamada para a API específica para esta categoria
    }
  }, [categoryId, products]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
    }
  };
  
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Produtos</h1>
        
        <form onSubmit={handleSearch} className="w-full md:w-auto">
          <div className="relative">
            <TextInput
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar produtos..."
              rightIcon={HiSearch}
              className="w-full md:w-64"
            />
            <Button
              type="submit"
              className="absolute right-0 top-0 rounded-l-none"
            >
              Buscar
            </Button>
          </div>
        </form>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div>
          <ProductFilter />
        </div>
        
        <div className="lg:col-span-3">
          <Tabs>
            <Tabs.Item title="Todos os Produtos" active>
              <ProductGrid products={displayProducts} />
            </Tabs.Item>
            <Tabs.Item title="Mais Vendidos">
              <ProductGrid products={displayProducts.filter(p => p.rating >= 4)} />
            </Tabs.Item>
            <Tabs.Item title="Novidades">
              {/* Aqui você poderia filtrar por data de criação se tivesse essa informação */}
              <ProductGrid products={displayProducts.slice(0, 6)} />
            </Tabs.Item>
            <Tabs.Item title="Promoções">
              {/* Aqui você poderia mostrar produtos em promoção */}
              <ProductGrid products={displayProducts.slice(6, 12)} />
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;