// src/pages/OrdersPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Badge, Table, Button } from 'flowbite-react';
import { fetchOrders } from '../redux/slices/orderSlice';
import Loader from '../components/ui/Loader';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isAuthenticated]);

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

  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Meus Pedidos</h1>
        <p className="mb-6">Você ainda não possui pedidos.</p>
        <Button as={Link} to="/products" gradientDuoTone="purpleToBlue">
          Explorar Produtos
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meus Pedidos</h1>
      
      <Card>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Pedido</Table.HeadCell>
              <Table.HeadCell>Data</Table.HeadCell>
              <Table.HeadCell>Valor</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Rastreio</Table.HeadCell>
              <Table.HeadCell>Ações</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {orders.map((order) => (
                <Table.Row key={order.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    #{order.id}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </Table.Cell>
                  <Table.Cell>
                    R$ {order.totalPrice.toFixed(2)}
                  </Table.Cell>
                  <Table.Cell>
                    {getStatusBadge(order.status)}
                  </Table.Cell>
                  <Table.Cell>
                    {order.trackingCode ? order.trackingCode : '-'}
                  </Table.Cell>
                  <Table.Cell>
                    <Button 
                      as={Link} 
                      to={`/order/${order.id}`}
                      color="blue"
                      size="xs"
                    >
                      Detalhes
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>
  );
}