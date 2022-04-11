import React, { useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { useProducts } from '../../context/products';
import { IOrderList } from '../../interfaces/interfaces';
import { Container, OrderText, StyledScrollView } from './styles';

export const ListContainer = () => {
  const { productsList, filteredList } = useProducts();
  const [orderList, setOrderList] = useState<IOrderList>(IOrderList.ordenar);

  return (
    <Container>
      <OrderText onPress={() => {}}>{orderList}</OrderText>
      <StyledScrollView>
        {filteredList
          ? filteredList &&
            filteredList.map((item, index) => (
              <ProductCard key={index} produto={item} />
            ))
          : productsList &&
            productsList.map((item, index) => (
              <ProductCard key={index} produto={item} />
            ))}
      </StyledScrollView>
    </Container>
  );
};
