import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { OrderModal } from '../../components/OrderModal';
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
  const { filteredList, orderList } = useProducts();
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [loadStorageUser, setLoadStorageUser] = useState<boolean>(false);

  const isLoadedStorage = useCallback(async () => {
    const response = await ManagementList.initAppStorage();
    if (response) setLoadStorageUser(response);
  }, []);

  useEffect(() => {
    isLoadedStorage();
  }, []);

  const ProductsList = useMemo(
    () => (
      <StyledScrollView>
        {filteredList &&
          filteredList.map((item) => (
            <ProductCard key={item.id} produto={item} />
          ))}
      </StyledScrollView>
    ),
    [orderList, filteredList]
  );

  return (
    <Container>
      {loadStorageUser && (
        <OrderContainer onPress={() => setModalIsVisible(true)}>
          <OrderText>{orderList}</OrderText>
          <Image source={require('./img/arrow.png')} />
        </OrderContainer>
      )}
      {loadStorageUser ? (
        ProductsList
      ) : (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#FE8235" />
        </LoadingContainer>
      )}
      <OrderModal
        isVisible={modalIsVisible}
        setClose={() => setModalIsVisible(false)}
      />
    </Container>
  );
};
