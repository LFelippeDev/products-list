import AsyncStorage from '@react-native-async-storage/async-storage';
import { IProduto, IProdutoNotCompleted } from '../interfaces/interfaces';
import ManagementList from '../services/products';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('create new product', () => {
  const mockProduct: IProdutoNotCompleted = {
    nome: 'Produto teste',
    estoque: 1,
    preco: 2,
    precoTotal: 2,
  };

  const mockAddProduct = jest.fn(async (newProduct: IProdutoNotCompleted) => {
    const response = await ManagementList.addProduct(newProduct);
    return response;
  });

  const mockedList = async (listLength: number) => {
    while (listLength !== 0) {
      const response = await mockAddProduct(mockProduct);
      listLength--;

      if (listLength === 0) return response;
    }
  };

  const mockUpdateProduct = jest.fn(async (updateProduct: IProduto) => {
    const response = await ManagementList.updateProduct(updateProduct);
    return response;
  });

  it('update product when exists id', async () => {
    await mockedList(3);
    expect(
      await mockUpdateProduct({
        ...mockProduct,
        id: 2,
        estoque: 3,
        precoTotal: 6,
      })
    ).toEqual([
      { ...mockProduct, id: 1 },
      { ...mockProduct, id: 2, estoque: 3, precoTotal: 6 },
      { ...mockProduct, id: 3 },
    ]);
  });

  it('update product when not exists id', async () => {
    await mockedList(3);
    expect(
      await mockUpdateProduct({
        ...mockProduct,
        id: 4,
        estoque: 3,
        precoTotal: 6,
      })
    ).toEqual(
      new Error('Esse produto não existe.', {
        cause: {
          name: 'notFound',
          message: 'O id não foi encontrado.',
        },
      })
    );
  });

  it('update product return error when stock equal 0', async () => {
    await mockedList(3);
    expect(
      await mockUpdateProduct({
        ...mockProduct,
        id: 2,
        estoque: 0,
      })
    ).toEqual(
      new Error('Insira um estoque válido.', {
        cause: {
          name: 'incorrectParam',
          message: 'A propriedade estoque deve ser maior que 0.',
        },
      })
    );
  });

  it('update product return error when price equal 0', async () => {
    await mockedList(3);
    expect(
      await mockUpdateProduct({
        ...mockProduct,
        id: 2,
        preco: 0,
      })
    ).toEqual(
      new Error('Insira um preço válido.', {
        cause: {
          name: 'incorrectParam',
          message: 'A propriedade preco deve ser maior que 0.',
        },
      })
    );
  });

  it('update product return error when total price diffent stock multiplied price', async () => {
    await mockedList(3);
    expect(
      await mockUpdateProduct({
        ...mockProduct,
        id: 2,
        precoTotal: 0,
      })
    ).toEqual(
      new Error('Insira um preço total válido.', {
        cause: {
          name: 'incorrectParam',
          message:
            'O nome precoTotal deve ser, o preco do produto multiplicado pelo estoque.',
        },
      })
    );
  });

  it('update product return error when name is empty', async () => {
    await mockedList(3);
    expect(
      await mockUpdateProduct({
        ...mockProduct,
        id: 2,
        nome: '',
      })
    ).toEqual(
      new Error('Insira um nome válido.', {
        cause: {
          name: 'incorrectParam',
          message: 'A propriedade nome deve existir.',
        },
      })
    );
  });
});
