// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Label, TextInput, Checkbox, Alert } from 'flowbite-react';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { login, clearError } from '../redux/slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
      });
  };
  
  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Entrar na sua conta</h2>
        
        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <Label htmlFor="remember">Lembrar de mim</Label>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Esqueceu a senha?
            </Link>
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
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Cadastrar-se
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;