// src/pages/OrderDetailPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Card, Badge, Button, Timeline } from 'flowbite-react';
import { fetchOrderById } from '../redux/slices/orderSlice';
import Loader from '../components/ui/Loader';

export default function OrderDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOrder, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader size="lg" />;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
        <Button as={Link} to="/orders" color="blue">
          Voltar para Meus Pedidos
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: { color: 'warning', label: 'Pendente' },
      PAYED: { color: 'info', label: 'Pago' },
      SENT: { color: 'purple', label: 'Enviado' },
      DELIVERED: { color: 'success', label: 'Entregue' }
    };
    
    const statusInfo = statusMap[status] || { color: 'gray', label: status };
    
    return <Badge color={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalhes do Pedido #{selectedOrder.id}</h1>
        <Button as={Link} to="/orders" color="light">
          Voltar
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Informações do Pedido</h2>
              {getStatusBadge(selectedOrder.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Data do Pedido</p>
                <p>{new Date(selectedOrder.createdAt).toLocaleDateString('pt-BR')} às {new Date(selectedOrder.createdAt).toLocaleTimeString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total</p>
                <p className="font-semibold">R$ {selectedOrder.totalPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Cliente</p>
                <p>{selectedOrder.user.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Código de Rastreio</p>
                <p>{selectedOrder.trackingCode || '-'}</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold mb-4">Itens do Pedido</h2>
            
            <div className="space-y-4">
              {/* Aqui precisaríamos dos itens do pedido, que não estão incluídos no DTO */}
              <div className="flex items-center border-b pb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-md mr-4"></div>
                <div className="flex-grow">
                  <p className="font-medium">Nome do Produto</p>
                  <p className="text-sm text-gray-500">Tamanho: 42 | Cor: Preto</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ 199,90</p>
                  <p className="text-sm text-gray-500">Qtd: 1</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-md mr-4"></div>
                <div className="flex-grow">
                  <p className="font-medium">Nome do Produto</p>
                  <p className="text-sm text-gray-500">Tamanho: 40 | Cor: Branco</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ 159,90</p>
                  <p className="text-sm text-gray-500">Qtd: 1</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card>
            <h2 className="text-xl font-semibold mb-4">Status do Pedido</h2>
            
            <Timeline>
              <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                  <Timeline.Time>
                    {new Date(selectedOrder.createdAt).toLocaleDateString('pt-BR')}
                  </Timeline.Time>
                  <Timeline.Title>Pedido Realizado</Timeline.Title>
                  <Timeline.Body>
                    Seu pedido foi recebido e está sendo processado.
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
              
              {selectedOrder.status === 'PAYED' || selectedOrder.status === 'SENT' || selectedOrder.status === 'DELIVERED' ? (
                <Timeline.Item>
                  <Timeline.Point />
                  <Timeline.Content>
                    <Timeline.Time>
                      {new Date(selectedOrder.updatedAt).toLocaleDateString('pt-BR')}
                    </Timeline.Time>
                    <Timeline.Title>Pagamento Confirmado</Timeline.Title>
                    <Timeline.Body>
                      Seu pagamento foi aprovado e confirmado.
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              ) : null}
              
              {selectedOrder.status === 'SENT' || selectedOrder.status === 'DELIVERED' ? (
                <Timeline.Item>
                  <Timeline.Point />
                  <Timeline.Content>
                    <Timeline.Time>
                      {new Date(selectedOrder.updatedAt).toLocaleDateString('pt-BR')}
                    </Timeline.Time>
                    <Timeline.Title>Pedido Enviado</Timeline.Title>
                    <Timeline.Body>
                      Seu pedido foi enviado e está a caminho.
                      {selectedOrder.trackingCode && (
                        <p className="mt-2">
                          Código de rastreio: <span className="font-medium">{selectedOrder.trackingCode}</span>
                        </p>
                      )}
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              ) : null}
              
              {selectedOrder.status === 'DELIVERED' ? (
                <Timeline.Item>
                  <Timeline.Point />
                  <Timeline.Content>
                    <Timeline.Time>
                      {new Date(selectedOrder.updatedAt).toLocaleDateString('pt-BR')}
                    </Timeline.Time>
                    <Timeline.Title>Pedido Entregue</Timeline.Title>
                    <Timeline.Body>
                      Seu pedido foi entregue com sucesso!
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              ) : null}
            </Timeline>
          </Card>
          
          <div className="mt-6">
            <Button
              as="a"
              href={`mailto:suporte@primeshoes.com?subject=Suporte%20Pedido%20${selectedOrder.id}`}
              color="light"
              className="w-full"
            >
              Precisa de ajuda? Entre em contato
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}