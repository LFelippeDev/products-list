import React from 'react';
import { FormInput } from '../../components/FormInput';
import {
  Button,
  ButtonContainer,
  Container,
  ContainerFooter,
  ContainerSubTitle,
  ContainerTitle,
  TextButton,
} from './styles';

export const FormContainer = () => {
  return (
    <Container>
      <ContainerTitle>Lista de Produtos</ContainerTitle>
      <FormInput placeholder="Pesquise um produto" />
      <ContainerSubTitle>Novo Produto</ContainerSubTitle>
      <FormInput label="Nome" placeholder="Digite um nome" />
      <ContainerFooter>
        <FormInput
          label="Quantidade em Estoque"
          placeholder="Estoque"
          keyboardType="numeric"
          maxLenght={3}
        />
        <FormInput label="Preço" placeholder="R$" keyboardType="numeric" />
      </ContainerFooter>
      <ButtonContainer>
        <Button onPress={() => {}}>
          <TextButton>Novo Produto</TextButton>
        </Button>
      </ButtonContainer>
    </Container>
  );
};
