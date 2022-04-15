import AsyncStorage from '@react-native-async-storage/async-storage';
import { IProdutoNotCompleted } from '../interfaces/interfaces';
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

  it('add new product when list is empty', async () => {
    expect(await mockAddProduct(mockProduct)).toEqual([
      { ...mockProduct, id: 1 },
    ]);
  });

  it('add new product when list no empty', async () => {
    expect(await mockedList(2)).toEqual([
      { ...mockProduct, id: 1 },
      { ...mockProduct, id: 2 },
    ]);
  });

  it('add new product when has available id', async () => {
    await ManagementList.setAvailableIds(5);
    expect(await mockAddProduct(mockProduct)).toEqual([
      { ...mockProduct, id: 5 },
    ]);
  });

  it('add new product by numeric order when has available id ', async () => {
    await ManagementList.setAvailableIds(3);
    await ManagementList.setAvailableIds(1);
    await ManagementList.setAvailableIds(2);
    expect(await mockedList(3)).toEqual([
      { ...mockProduct, id: 1 },
      { ...mockProduct, id: 2 },
      { ...mockProduct, id: 3 },
    ]);
  });

  it('add new product return error when stock equal 0', async () => {
    expect(
      await mockAddProduct({
        ...mockProduct,
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

  it('add new product return error when price equal 0', async () => {
    expect(
      await mockAddProduct({
        ...mockProduct,
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

  it('add new product return error when total price diffent stock multiplied price', async () => {
    expect(
      await mockAddProduct({
        ...mockProduct,
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

  it('add new product return error when name is empty', async () => {
    expect(
      await mockAddProduct({
        ...mockProduct,
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
