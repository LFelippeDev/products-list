import React from 'react';
import { IProduto } from '../../interfaces/interfaces';
import { Image } from 'react-native';
import { Incrementor } from '../Incrementor';
import { CardText, Container, Divisor, Footer, Header, Main } from './styles';
import { light } from '../../styles/themes';

interface IProductCardProps {
  produto: IProduto;
}

export const ProductCard = ({ produto }: IProductCardProps) => {
  const { id, nome, preco, estoque } = produto;
  const totalPrice = (estoque * preco).toFixed(2);

  return (
    <Container>
      <Header>
        <CardText fontFamily="Medium" fontSize={12}>
          {`#${id}`}
        </CardText>
        <CardText
          fontFamily="Medium"
          fontSize={12}
          color={light.colors.delete_product_text}
        >
          Excluir Produto
        </CardText>
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
        <Incrementor value={estoque} />
        <CardText
          fontFamily="Bold"
          fontSize={14}
          color={light.colors.primary_orange}
        >
          Total: R$ {totalPrice}
        </CardText>
      </Footer>
    </Container>
  );
};
