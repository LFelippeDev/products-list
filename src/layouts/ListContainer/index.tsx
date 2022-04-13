import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import { OrderModal } from '../../components/OrderModal';
import { ProductCard } from '../../components/ProductCard';
import { useProducts } from '../../context/products';
import { IOrderList, IProduto } from '../../interfaces/interfaces';
import ManagementList from '../../services/products';
import {
  Container,
  LoadingContainer,
  OrderContainer,
  OrderText,
} from './styles';

export const ListContainer = () => {
  const { filteredList, orderList, setCustomOrderedList } = useProducts();
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [loadStorageUser, setLoadStorageUser] = useState<boolean>(false);

  const isLoadedStorage = useCallback(async () => {
    const response = await ManagementList.initAppStorage();
    if (response) setLoadStorageUser(response);
  }, []);

  useEffect(() => {
    isLoadedStorage();
  }, []);

  const ProductItemRender = useCallback(
    (product: IProduto, drag: () => void) => {
      const { isActive } = useOnCellActiveAnimation();

      if (orderList === IOrderList.ordenar)
        return (
          <ScaleDecorator>
            <Animated.View>
              <ProductCard
                produto={product}
                onLongPress={drag}
                isActive={isActive}
              />
            </Animated.View>
          </ScaleDecorator>
        );

      return <ProductCard produto={product} />;
    },
    [orderList]
  );

  return (
    <Container>
      {loadStorageUser && (
        <OrderContainer onPress={() => setModalIsVisible(true)}>
          <OrderText>{orderList}</OrderText>
          <Image source={require('./img/arrow.png')} />
        </OrderContainer>
      )}
      {loadStorageUser && filteredList ? (
        <DraggableFlatList
          data={filteredList}
          keyExtractor={(item) => item.id.toString()}
          onDragEnd={({ data }) => setCustomOrderedList(data)}
          renderItem={({ item, drag }) => ProductItemRender(item, drag)}
        />
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
