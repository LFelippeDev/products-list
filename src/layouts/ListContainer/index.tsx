import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { ProductCard } from '../../components/ProductCard';
import { useProducts } from '../../context/products';
import ManagementList from '../../services/products';
import {
  Container,
  LoadingContainer,
  OrderContainer,
  OrderText,
  StyledScrollView,
} from './styles';

export const ListContainer = () => {
  const { filteredList, orderList, setOrderList } = useProducts();
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
          <OrderContainer>
            <OrderText onPress={() => setModalIsVisible(true)}>
              {orderList}
            </OrderText>
            <Image source={require('./img/arrow.png')} />
          </OrderContainer>
          <StyledScrollView>
            {filteredList &&
              filteredList.map((item, index) => (
                <ProductCard key={index} produto={item} />
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
