import React, { useCallback, useState } from 'react';
import { FormInput } from '../../components/FormInput';
import { useProducts } from '../../context/products';
import { IField, IProdutoNotCompleted } from '../../interfaces/interfaces';
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
  const { createProduct, setSearchFilter, searchFilter } = useProducts();
  const [newNome, setNewNome] = useState<IField>({
    value: '',
    isInvalid: false,
  });
  const [newEstoque, setNewEstoque] = useState<IField>({
    value: '',
    isInvalid: false,
  });
  const [newPreco, setNewPreco] = useState<IField>({
    value: '',
    isInvalid: false,
  });
  const inSearching = searchFilter === '';

  const validateNewProduct = useCallback(():
    | IProdutoNotCompleted
    | undefined => {
    if (newNome.value === '') setNewNome({ ...newNome, isInvalid: true });
    if (Number(newPreco.value) <= 0)
      setNewPreco({ ...newPreco, isInvalid: true });
    if (Number(newEstoque.value) <= 0)
      setNewEstoque({ ...newEstoque, isInvalid: true });
    if (
      newNome.value === '' ||
      Number(newPreco.value) <= 0 ||
      Number(newEstoque.value) <= 0
    )
      return;
    if (
      typeof newNome.value === 'string' &&
      typeof Number(newPreco.value) === 'number' &&
      typeof Number(newEstoque.value) === 'number'
    ) {
      return {
        nome: newNome.value,
        estoque: Number(newEstoque.value),
        preco: Number(newPreco.value),
        precoTotal: Number(newEstoque.value) * Number(newPreco.value),
      };
    }
    return;
  }, [newNome, newEstoque, newPreco]);

  const addNewProduct = useCallback(() => {
    const validNewProduct = validateNewProduct();
    if (!validNewProduct) return;
    createProduct({
      validNewProduct,
      preco: validNewProduct.preco.replace(/[^0-9]/g, ''),
    });
    setNewNome({ value: '', isInvalid: false });
    setNewEstoque({ value: '', isInvalid: false });
    setNewPreco({ value: '', isInvalid: false });
  }, [validateNewProduct]);

  const handleFieldValue = useCallback(
    (setState: (value: IField) => void, value: string, isNumber?: boolean) =>
      setState({
        value: isNumber ? value.replace(/[^0-9]/g, '') : value,
        isInvalid: value === '' || Number(value) === 0 ? true : false,
      }),
    []
  );

  return (
    <Container inSearching={inSearching}>
      <ContainerTitle>Lista de Produtos</ContainerTitle>
      <FormInput
        placeholder="Pesquise um produto"
        onChangeText={setSearchFilter}
      />
      {inSearching && (
        <>
          <ContainerSubTitle>Novo Produto</ContainerSubTitle>
          <FormInput
            label="Nome"
            placeholder="Digite um nome"
            onChangeText={(value) => handleFieldValue(setNewNome, value)}
            value={newNome.value}
            isInvalid={newNome.isInvalid}
          />
          <ContainerFooter>
            <FormInput
              label="Quantidade em Estoque"
              placeholder="Estoque"
              keyboardType="numeric"
              onChangeText={(value) =>
                handleFieldValue(setNewEstoque, value, true)
              }
              value={newEstoque.value}
              isInvalid={newEstoque.isInvalid}
            />
            <FormInput
              label="Preço"
              placeholder="R$"
              keyboardType="numeric"
              onChangeText={(value) =>
                handleFieldValue(setNewPreco, value, true)
              }
              value={newPreco.value}
              isInvalid={newPreco.isInvalid}
            />
          </ContainerFooter>

          <ButtonContainer>
            <Button onPress={addNewProduct}>
              <TextButton>Novo Produto</TextButton>
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};
