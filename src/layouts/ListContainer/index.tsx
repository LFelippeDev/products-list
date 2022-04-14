import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import { AlertWithoutData } from '../../components/AlertWithoutData';
import { OrderModal } from '../../components/OrderModal';
import { ProductCard } from '../../components/ProductCard';
import { useProducts } from '../../context/products';
import { IOrderList, IProduto } from '../../interfaces/interfaces';
import {
  Container,
  LoadingContainer,
  OrderContainer,
  OrderText,
} from './styles';

export const ListContainer = () => {
  const { filteredList, orderList, setCustomOrderedList, searchFilter } =
    useProducts();
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const inSearching = searchFilter === '';

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
      <OrderContainer onPress={() => setModalIsVisible(true)}>
        <OrderText>{orderList}</OrderText>
        <Image source={require('./img/arrow.png')} />
      </OrderContainer>
      {filteredList?.length === 0 &&
        (inSearching ? (
          <AlertWithoutData text="Lista vazia, insira um produto." />
        ) : (
          <AlertWithoutData text="Produto não encontrado." />
        ))}

      {filteredList ? (
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
