import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Dropdown, Avatar, Badge } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

export default function NavbarComponent() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <Navbar fluid className="border-b shadow-sm">
      <Navbar.Brand as={Link} to="/">
        <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="PrimeShoes Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          PrimeShoes
        </span>
      </Navbar.Brand>
      
      <div className="flex md:order-2">
        <form onSubmit={handleSearch} className="hidden md:flex mr-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar produtos..."
              className="py-2 pl-3 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </form>
        
        <Link to="/cart" className="mr-4 mt-1 relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          {items.length > 0 && (
            <Badge color="failure" className="absolute -top-2 -right-2">
              {items.length}
            </Badge>
          )}
        </Link>
        
        {isAuthenticated ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User"
                img="https://ui-avatars.com/api/?name=User"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.name || 'Usuário'}</span>
              <span className="block truncate text-sm font-medium">{user?.email || ''}</span>
            </Dropdown.Header>
            <Dropdown.Item as={Link} to="/profile">Meu Perfil</Dropdown.Item>
            <Dropdown.Item as={Link} to="/orders">Meus Pedidos</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">
              Entrar
            </Link>
            <Link to="/register" className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
              Cadastrar
            </Link>
          </div>
        )}
        
        <Navbar.Toggle />
      </div>
      
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active>
          Início
        </Navbar.Link>
        <Navbar.Link as={Link} to="/products">Produtos</Navbar.Link>
        <Navbar.Link as={Link} to="/categories">Categorias</Navbar.Link>
        <Navbar.Link as={Link} to="/brands">Marcas</Navbar.Link>
        <Navbar.Link as={Link} to="/promotions">Promoções</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}