// src/pages/RegisterPage.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Label, TextInput, Alert, Select } from 'flowbite-react';
import { HiMail, HiLockClosed, HiUser } from 'react-icons/hi';
import { register, clearError } from '../redux/slices/authSlice';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('BUYER');
  const [passwordError, setPasswordError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // Se já estiver autenticado, redirecionar para a página inicial
    if (isAuthenticated) {
      navigate('/');
    }
    
    // Limpar erros anteriores
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);
  
  const validateForm = () => {
    setPasswordError('');
    
    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem');
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(register({ name, email, password, role }))
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Erro ao registrar:', error);
      });
  };
  
  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Criar uma conta</h2>
        
        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nome completo" />
            </div>
            <TextInput
              id="name"
              type="text"
              icon={HiUser}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>
          
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="E-mail" />
            </div>
            <TextInput
              id="email"
              type="email"
              icon={HiMail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@exemplo.com"
              required
            />
          </div>
          
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Senha" />
            </div>
            <TextInput
              id="password"
              type="password"
              icon={HiLockClosed}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword" value="Confirmar senha" />
            </div>
            <TextInput
              id="confirmPassword"
              type="password"
              icon={HiLockClosed}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              color={passwordError ? 'failure' : undefined}
              helperText={passwordError}
            />
          </div>
          
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Tipo de conta" />
            </div>
            <Select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="BUYER">Comprador</option>
              <option value="SELLER">Vendedor</option>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            gradientDuoTone="purpleToBlue" 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="mr-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                Registrando...
              </>
            ) : (
              'Cadastrar'
            )}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;