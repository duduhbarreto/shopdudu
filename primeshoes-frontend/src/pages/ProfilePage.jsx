// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Label, TextInput, Avatar, Tabs } from 'flowbite-react';
import { toast } from 'react-toastify';
import { update } from '../redux/slices/authSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        password: '',
        confirmPassword: '',
        role: user.role
      });
    }
  }, [user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    const userData = {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      role: formData.role
    };
    
    if (formData.password) {
      userData.password = formData.password;
    }
    
    dispatch(update(userData))
      .unwrap()
      .then(() => {
        toast.success('Perfil atualizado com sucesso!');
      })
      .catch((err) => {
        toast.error('Erro ao atualizar perfil: ' + err);
      });
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Card>
            <div className="flex flex-col items-center">
              <Avatar
                size="xl"
                img={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                rounded
                className="mb-4"
              />
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                {user?.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </span>
              <div className="mt-4">
                <Badge color={user?.role === 'BUYER' ? 'info' : 'success'}>
                  {user?.role === 'BUYER' ? 'Cliente' : 'Vendedor'}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <Tabs>
              <Tabs.Item active title="Informações Pessoais">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" value="Nome Completo" />
                    <TextInput
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" value="E-mail" />
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="border-t my-4 pt-4">
                    <h3 className="text-lg font-medium mb-4">Alterar Senha</h3>
                    
                    <div className="mb-4">
                      <Label htmlFor="password" value="Nova Senha" />
                      <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Deixe em branco para manter a senha atual"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword" value="Confirmar Nova Senha" />
                      <TextInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirme a nova senha"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" gradientDuoTone="purpleToBlue" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </form>
              </Tabs.Item>
              
              <Tabs.Item title="Endereços">
                <div className="mb-4">
                  <Button color="gray" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Adicionar Novo Endereço
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">Endereço Principal</h3>
                        <p className="text-sm text-gray-600">Rua Exemplo, 123</p>
                        <p className="text-sm text-gray-600">Bairro, Cidade - Estado</p>
                        <p className="text-sm text-gray-600">CEP: 12345-678</p>
                      </div>
                      <div>
                        <Button color="light" size="xs">Editar</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </Tabs.Item>
              
              <Tabs.Item title="Preferências">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Receber e-mails promocionais</h3>
                      <p className="text-sm text-gray-600">Fique por dentro das novidades e promoções</p>
                    </div>
                    <div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4"></div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificações de pedidos</h3>
                      <p className="text-sm text-gray-600">Receba atualizações sobre seus pedidos</p>
                    </div>
                    <div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                  </div>
                </div>
              </Tabs.Item>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}