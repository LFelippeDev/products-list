import AsyncStorage from '@react-native-async-storage/async-storage';
import { IProdutoNotCompleted } from '../interfaces/interfaces';
import ManagementList from '../services/products';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('delete product', () => {
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

  const mockDeleteProduct = jest.fn(async (idProduct: number) => {
    const response = await ManagementList.deleteProduct(idProduct);
    return response;
  });

  it('delete product when list is no empty', async () => {
    await mockedList(3);
    expect(await mockDeleteProduct(2)).toEqual([
      { ...mockProduct, id: 1 },
      { ...mockProduct, id: 3 },
    ]);
  });

  it('add new product and use id after delete product', async () => {
    await mockedList(3);
    await mockDeleteProduct(2);
    expect(await mockAddProduct(mockProduct)).toEqual([
      { ...mockProduct, id: 1 },
      { ...mockProduct, id: 3 },
      { ...mockProduct, id: 2 },
    ]);
  });

  it('add new product and use first id by numeric order after delete product', async () => {
    await mockedList(3);
    await mockDeleteProduct(3);
    await mockDeleteProduct(2);
    expect(await mockedList(2)).toEqual([
      { ...mockProduct, id: 1 },
      { ...mockProduct, id: 2 },
      { ...mockProduct, id: 3 },
    ]);
  });

  it('delete product returns error when id not existed', async () => {
    await mockedList(3);
    expect(await mockDeleteProduct(4)).toEqual(
      new Error('Esse produto não existe.', {
        cause: {
          name: 'notFound',
          message: 'O id não foi encontrado.',
        },
      })
    );
  });
});
