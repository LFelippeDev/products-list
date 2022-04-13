import React, { useCallback, useEffect, useState } from 'react';
import { GestureResponderEvent, Image } from 'react-native';
import { IProduto } from '../../interfaces/interfaces';
import { Incrementor } from '../Incrementor';
import {
  CardText,
  Container,
  DeleteProductText,
  Divisor,
  Footer,
  Header,
  Main,
} from './styles';
import { light } from '../../styles/themes';
import { useProducts } from '../../context/products';
import { Alert } from 'react-native';

interface IProductCardProps {
  produto: IProduto;
  isActive?: boolean;
  onLongPress?: (event: GestureResponderEvent) => void;
}

export const ProductCard = ({
  produto,
  onLongPress,
  isActive,
}: IProductCardProps) => {
  const { deleteProduct, updateProduct } = useProducts();
  const [updateEstoqueProduct, setUpdateEstoqueProduct] =
    useState<IProduto>(produto);
  const { id, nome, estoque, preco, precoTotal } = updateEstoqueProduct;
  const handleDeleteProduct = useCallback(() => {
    Alert.alert(
      'Excluir produto',
      'Tem certeza de que deseja excluir este produto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => deleteProduct(id),
          style: 'destructive',
        },
      ]
    );
  }, [deleteProduct, id]);

  useEffect(() => {
    updateProduct(updateEstoqueProduct);
  }, [estoque]);

  return (
    <Container onLongPress={onLongPress} isActive={isActive}>
      <Header>
        <CardText fontFamily="Medium" fontSize={12}>
          {`#${id}`}
        </CardText>
        <DeleteProductText onPress={() => handleDeleteProduct()}>
          <CardText
            fontFamily="Medium"
            fontSize={12}
            color={light.colors.delete_product_text}
          >
            Excluir Produto
          </CardText>
          <Image source={require('./img/trash.png')} />
        </DeleteProductText>
      </Header>
      <Main>
        <CardText fontFamily="Bold" fontSize={16}>
          {nome}
        </CardText>
        <CardText fontFamily="Medium" fontSize={14}>
          R$ {preco.toFixed(2)}
        </CardText>
      </Main>
      <Divisor />
      <Footer>
        <Incrementor
          value={estoque}
          setValue={(value) => {
            value !== 0
              ? setUpdateEstoqueProduct({
                  ...updateEstoqueProduct,
                  estoque: value,
                  precoTotal: value * preco,
                })
              : handleDeleteProduct();
          }}
        />
        <CardText
          fontFamily="Bold"
          fontSize={14}
          color={light.colors.primary_orange}
        >
          Total: R$ {precoTotal.toFixed(2)}
        </CardText>
      </Footer>
    </Container>
  );
};
