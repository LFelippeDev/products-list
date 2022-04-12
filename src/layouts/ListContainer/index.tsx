import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { OrderModal } from '../../components/OrderModal';
import { ProductCard } from '../../components/ProductCard';
import { useProducts } from '../../context/products';
import ManagementList from '../../services/products';
import {
  Container,
  LoadingContainer,
  OrderText,
  StyledScrollView,
} from './styles';

export const ListContainer = () => {
  const { productsList, filteredList, orderList } = useProducts();
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [loadStorageUser, setLoadStorageUser] = useState<boolean>(false);

  const isLoadedStorage = useCallback(async () => {
    const response = await ManagementList.initAppStorage();
    if (response) setLoadStorageUser(response);
  }, []);

  useEffect(() => {
    isLoadedStorage();
  }, []);

  return (
    <Container>
      {loadStorageUser ? (
        <>
          <OrderText onPress={() => setModalIsVisible(true)}>
            {orderList}
          </OrderText>
          <StyledScrollView>
            {filteredList
              ? filteredList &&
                filteredList.map((item, index) => (
                  <ProductCard key={index} produto={item} />
                ))
              : productsList &&
                productsList.map((item) => (
                  <ProductCard key={item.id} produto={item} />
                ))}
          </StyledScrollView>
        </>
      ) : (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#FE8235" />
        </LoadingContainer>
      )}
    </Container>
  );
};
