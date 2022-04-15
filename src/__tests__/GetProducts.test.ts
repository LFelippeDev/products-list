import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  IOrderList,
  IProduto,
  IProdutoNotCompleted,
} from '../interfaces/interfaces';
import ManagementList from '../services/products';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('get products', () => {
  const mockProduct: IProdutoNotCompleted = {
    nome: 'Produto teste',
    estoque: 1,
    preco: 2,
    precoTotal: 2,
  };

  const unsortedList: IProdutoNotCompleted[] = [
    {
      nome: 'Pera',
      estoque: 1,
      preco: 2,
      precoTotal: 2,
    },
    {
      nome: 'Abacaxi',
      estoque: 3,
      preco: 3,
      precoTotal: 9,
    },
    {
      nome: 'Melancia',
      estoque: 2,
      preco: 1,
      precoTotal: 2,
    },
  ];

  const mockAddProduct = jest.fn(async (newProduct) => {
    const response = await ManagementList.addProduct(newProduct);
    return response;
  });

  const mockedList = async (listLength: number) => {
    while (listLength !== 0) {
      await mockAddProduct(mockProduct);
      listLength--;
    }
  };

  const mockedUnsortedList = async () => {
    await mockAddProduct(unsortedList[0]);
    await mockAddProduct(unsortedList[1]);
    await mockAddProduct(unsortedList[2]);
  };

  const mockGetProducts = jest.fn(async () => {
    const response = await ManagementList.getProducts();
    return response;
  });

  const mockGetSortProductsByParams = jest.fn(async (order) => {
    const response = await ManagementList.getSortProductsByParams(order);
    return response;
  });

  it('get products when list is empty', async () => {
    expect(await mockGetProducts()).toEqual([]);
  });

  it('get products when list no empty', async () => {
    await mockedList(5);
    expect(await mockGetProducts()).toEqual([
      { ...mockProduct, id: 1 },
      { ...mockProduct, id: 2 },
      { ...mockProduct, id: 3 },
      { ...mockProduct, id: 4 },
      { ...mockProduct, id: 5 },
    ]);
  });

  it('get products by id', async () => {
    await mockedUnsortedList();
    expect(await mockGetSortProductsByParams(IOrderList.id)).toEqual([
      {
        id: 1,
        nome: 'Pera',
        estoque: 1,
        preco: 2,
        precoTotal: 2,
      },
      {
        id: 2,
        nome: 'Abacaxi',
        estoque: 3,
        preco: 3,
        precoTotal: 9,
      },
      { id: 3, nome: 'Melancia', estoque: 2, preco: 1, precoTotal: 2 },
    ]);
  });

  it('get products by price', async () => {
    await mockedUnsortedList();
    expect(await mockGetSortProductsByParams(IOrderList.preco)).toEqual([
      { id: 3, nome: 'Melancia', estoque: 2, preco: 1, precoTotal: 2 },
      {
        id: 1,
        nome: 'Pera',
        estoque: 1,
        preco: 2,
        precoTotal: 2,
      },
      {
        id: 2,
        nome: 'Abacaxi',
        estoque: 3,
        preco: 3,
        precoTotal: 9,
      },
    ]);
  });

  it('get products by total price', async () => {
    await mockedUnsortedList();
    expect(await mockGetSortProductsByParams(IOrderList.precoTotal)).toEqual([
      {
        id: 1,
        nome: 'Pera',
        estoque: 1,
        preco: 2,
        precoTotal: 2,
      },
      { id: 3, nome: 'Melancia', estoque: 2, preco: 1, precoTotal: 2 },
      {
        id: 2,
        nome: 'Abacaxi',
        estoque: 3,
        preco: 3,
        precoTotal: 9,
      },
    ]);
  });

  it('get products by stock', async () => {
    await mockedUnsortedList();
    expect(await mockGetSortProductsByParams(IOrderList.estoque)).toEqual([
      {
        id: 1,
        nome: 'Pera',
        estoque: 1,
        preco: 2,
        precoTotal: 2,
      },
      { id: 3, nome: 'Melancia', estoque: 2, preco: 1, precoTotal: 2 },
      {
        id: 2,
        nome: 'Abacaxi',
        estoque: 3,
        preco: 3,
        precoTotal: 9,
      },
    ]);
  });

  it('get products by name', async () => {
    await mockedUnsortedList();
    expect(await mockGetSortProductsByParams(IOrderList.nome)).toEqual([
      {
        id: 2,
        nome: 'Abacaxi',
        estoque: 3,
        preco: 3,
        precoTotal: 9,
      },
      { id: 3, nome: 'Melancia', estoque: 2, preco: 1, precoTotal: 2 },
      {
        id: 1,
        nome: 'Pera',
        estoque: 1,
        preco: 2,
        precoTotal: 2,
      },
    ]);
  });

  it('get products by custom list', async () => {
    await mockedUnsortedList();
    expect(await mockGetSortProductsByParams(IOrderList.ordenar)).toEqual([
      {
        id: 1,
        nome: 'Pera',
        estoque: 1,
        preco: 2,
        precoTotal: 2,
      },
      {
        id: 2,
        nome: 'Abacaxi',
        estoque: 3,
        preco: 3,
        precoTotal: 9,
      },
      { id: 3, nome: 'Melancia', estoque: 2, preco: 1, precoTotal: 2 },
    ]);
  });
});
