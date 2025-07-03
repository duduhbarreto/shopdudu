// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        A página que você está procurando não existe ou foi removida.
      </p>
      <Button as={Link} to="/" gradientDuoTone="purpleToBlue" size="lg">
        Voltar para a Página Inicial
      </Button>
    </div>
  );
}