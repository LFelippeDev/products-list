import React, { useCallback, useState } from 'react';
import { FormInput } from '../../components/FormInput';
import { useProducts } from '../../context/products';
import {
  IField,
  IProduto,
  IProdutoNotCompleted,
} from '../../interfaces/interfaces';
import {
  Button,
  ButtonContainer,
  Container,
  ContainerFooter,
  ContainerSubTitle,
  ContainerTitle,
  TextButton,
} from './styles';

const VALIDATE_FIELDS = {
  nome: { isInvalid: false },
  estoque: { isInvalid: false },
  preco: { isInvalid: false },
};

export const FormContainer = () => {
  const { createProduct } = useProducts();
  const [newNome, setNewNome] = useState<IField>({
    value: '',
    isInvalid: false,
  });
  const [newEstoque, setNewEstoque] = useState<IField>({
    value: 0,
    isInvalid: false,
  });
  const [newPreco, setNewPreco] = useState<IField>({
    value: 0,
    isInvalid: false,
  });

  const validateNewProduct = useCallback(():
    | IProdutoNotCompleted
    | undefined => {
    if (
      typeof newNome.value === 'string' &&
      typeof newPreco.value === 'number' &&
      typeof newEstoque.value === 'number'
    ) {
      return {
        nome: newNome.value,
        estoque: newEstoque.value,
        preco: newPreco.value,
        precoTotal: newEstoque.value * newPreco.value,
      };
    }
    return;
  }, [newNome, newEstoque, newPreco]);

  const addNewProduct = useCallback(() => {
    const validNewProduct = validateNewProduct();
    if (!validNewProduct) return;
    createProduct(validNewProduct);
  }, [validateNewProduct]);

  const handleFieldValue = useCallback(
    (setState: (value: IField) => void, value: string | number) => {
      typeof value === 'number'
        ? setState({ value, isInvalid: value <= 0 ? true : false })
        : setState({ value, isInvalid: value === '' ? true : false });
    },
    []
  );

  return (
    <Container>
      <ContainerTitle>Lista de Produtos</ContainerTitle>
      <FormInput
        placeholder="Pesquise um produto"
        onChangeText={(value) => {}}
      />
      <ContainerSubTitle>Novo Produto</ContainerSubTitle>
      <FormInput
        label="Nome"
        placeholder="Digite um nome"
        onChangeText={(value) => handleFieldValue(setNewNome, value)}
        isInvalid={newNome.isInvalid}
      />
      <ContainerFooter>
        <FormInput
          label="Quantidade em Estoque"
          placeholder="Estoque"
          keyboardType="numeric"
          onChangeText={(value) =>
            handleFieldValue(setNewEstoque, Number(value))
          }
          isInvalid={newEstoque.isInvalid}
        />
        <FormInput
          label="Preço"
          placeholder="R$"
          keyboardType="numeric"
          onChangeText={(value) => handleFieldValue(setNewPreco, Number(value))}
          isInvalid={newPreco.isInvalid}
        />
      </ContainerFooter>
      <ButtonContainer>
        <Button onPress={addNewProduct}>
          <TextButton>Novo Produto</TextButton>
        </Button>
      </ButtonContainer>
    </Container>
  );
};
