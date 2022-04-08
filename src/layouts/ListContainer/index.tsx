import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { IOrderList, IProduto } from '../../interfaces/interfaces';
import { Arrow, Container, OrderText, StyledScrollView } from './styles';
const products: IProduto[] = [
  { id: 1, estoque: 123, nome: 'Macarrao', preco: 20.0 },
  { id: 2, estoque: 123, nome: 'Macarrao', preco: 20.0 },
  { id: 3, estoque: 123, nome: 'Macarrao', preco: 20.0 },
  { id: 4, estoque: 1230, nome: 'Macarrao', preco: 20.0 },
];
export const ListContainer = () => {
  const [orderList, setOrderList] = useState<IOrderList>(IOrderList.ordenar);
  const [productsList, setProductsList] = useState<IProduto[]>(products);

  useEffect(() => {}, [orderList]);

  return (
    <Container>
      <OrderText onPress={() => {}}>{orderList}</OrderText>
      <StyledScrollView>
        {productsList.map((item) => (
          <ProductCard key={item.id} produto={item} />
        ))}
      </StyledScrollView>
    </Container>
  );
};
