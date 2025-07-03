// src/components/product/ProductFilter.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Button, Label, TextInput, RangeSlider, Checkbox } from 'flowbite-react';
import { fetchCategories, fetchBrands, filterProducts, clearFilters } from '../../redux/slices/productSlice';

const ProductFilter = () => {
  const dispatch = useDispatch();
  const { categories, brands } = useSelector((state) => state.products);
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleBrandChange = (brandId) => {
    setSelectedBrands(prev => 
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };
  
  const handleApplyFilters = () => {
    dispatch(filterProducts({
      categoryIds: selectedCategories,
      brandIds: selectedBrands,
      minPrice: priceRange.min,
      maxPrice: priceRange.max
    }));
  };
  
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 1000 });
    dispatch(clearFilters());
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      
      <Accordion collapseAll={false}>
        <Accordion.Panel>
          <Accordion.Title>Categorias</Accordion.Title>
          <Accordion.Content>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="ml-2">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        
        <Accordion.Panel>
          <Accordion.Title>Marcas</Accordion.Title>
          <Accordion.Content>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => handleBrandChange(brand.id)}
                  />
                  <Label htmlFor={`brand-${brand.id}`} className="ml-2">
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        
        <Accordion.Panel>
          <Accordion.Title>Preço</Accordion.Title>
          <Accordion.Content>
            <div className="space-y-4">
              <div className="flex justify-between">
                <TextInput
                  id="min-price"
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  min="0"
                  max={priceRange.max}
                  sizing="sm"
                  className="w-20"
                />
                <span className="mx-2">até</span>
                <TextInput
                  id="max-price"
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  min={priceRange.min}
                  sizing="sm"
                  className="w-20"
                />
              </div>
              
              <RangeSlider
                id="price-range"
                min={0}
                max={1000}
                step={10}
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              />
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      
      <div className="mt-6 space-y-2">
        <Button onClick={handleApplyFilters} color="blue" className="w-full">
          Aplicar Filtros
        </Button>
        <Button onClick={handleClearFilters} color="light" className="w-full">
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;