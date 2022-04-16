import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  IOrderList,
  IProduto,
  IProdutoNotCompleted,
} from '../interfaces/interfaces';

type ResponseRequests = Promise<IProduto[] | undefined | Error>;

const addProduct = async (value: IProdutoNotCompleted): ResponseRequests => {
  try {
    const { estoque, nome, preco, precoTotal } = value;
    if (nome === '')
      throw new Error('Insira um nome válido.', {
        cause: {
          name: 'incorrectParam',
          message: 'A propriedade nome deve existir.',
        },
      });
    if (estoque === 0)
      throw new Error('Insira um estoque válido.', {
        cause: {
          name: 'incorrectParam',
          message: 'A propriedade estoque deve ser maior que 0.',
        },
      });
    if (preco === 0)
      throw new Error('Insira um preço válido.', {
        cause: {
          name: 'incorrectParam',
          message: 'A propriedade preco deve ser maior que 0.',
        },
      });
    if (precoTotal !== preco * estoque)
      throw new Error('Insira um preço total válido.', {
        cause: {
          name: 'incorrectParam',
          message:
            'O nome precoTotal deve ser, o preco do produto multiplicado pelo estoque.',
        },
      });

    const responseProducts = await AsyncStorage.getItem('@products_List');
    let unparsedProducts: IProduto[] = [];
    if (responseProducts) unparsedProducts = JSON.parse(responseProducts);

    let responseIds = await getAvailableIds();
    if (!responseIds) responseIds = [];

    const firstAvailableId = responseIds[0];
    const usedId = firstAvailableId
      ? firstAvailableId
      : unparsedProducts.length + 1;

    if (typeof usedId !== 'number')
      throw new Error('Id esta incorreto.', {
        cause: {
          name: 'incorrectParam',
          message: 'O id deve ser do tipo number.',
        },
      });

    unparsedProducts.push({ id: usedId, ...value });

    if (responseIds.length > 0) {
      responseIds.shift();
      await AsyncStorage.setItem('@available_Ids', JSON.stringify(responseIds));
    }

    await AsyncStorage.setItem(
      '@products_List',
      JSON.stringify(unparsedProducts)
    );

    return unparsedProducts;
  } catch (error: any) {
    const treatedError: Error = error;
    return treatedError;
  }
};

const setAvailableIds = async (idAvailable: number) => {
  try {
    const response = await AsyncStorage.getItem('@available_Ids');

    let unparsedValue: Number[] = [];
    if (response) unparsedValue = JSON.parse(response);

    unparsedValue.push(idAvailable);
    const sortedValues = unparsedValue.sort();
    await AsyncStorage.setItem('@available_Ids', JSON.stringify(sortedValues));
    return;
  } catch (e) {
    console.log(e);
  }
};

const setOrderList = async (newOrderedList: IProduto[]) => {
  try {
    await AsyncStorage.setItem(
      '@available_Ids',
      JSON.stringify(newOrderedList)
    );
    return newOrderedList;
  } catch (e) {
    console.log(e);
  }
};

const getProducts = async (): Promise<IProduto[] | undefined> => {
  try {
    const response = await AsyncStorage.getItem('@products_List');

    if (!response) return [];

    return JSON.parse(response);
  } catch (e) {
    console.log(e);
  }
};

const getSortProductsByParams = async (order: IOrderList): ResponseRequests => {
  try {
    const response = await AsyncStorage.getItem('@products_List');
    if (!response) return [];

    const unparsedValue: IProduto[] = JSON.parse(response);

    switch (order) {
      case IOrderList.id:
        return unparsedValue.sort((a, b) => a.id - b.id);
      case IOrderList.nome:
        return unparsedValue.sort((a, b) => {
          if (a.nome < b.nome) return -1;
          if (a.nome > b.nome) return 1;
          return 0;
        });
      case IOrderList.preco:
        return unparsedValue.sort((a, b) => a.preco - b.preco);
      case IOrderList.precoTotal:
        return unparsedValue.sort((a, b) => a.precoTotal - b.precoTotal);
      case IOrderList.estoque:
        return unparsedValue.sort((a, b) => a.estoque - b.estoque);
      default:
        return unparsedValue;
    }
  } catch (e) {
    console.log(e);
  }
};

const getAvailableIds = async () => {
  try {
    const response = await AsyncStorage.getItem('@available_Ids');

    if (!response) return [];

    return JSON.parse(response);
  } catch (e) {
    console.log(e);
  }
};

const deleteProduct = async (idProduct: number): ResponseRequests => {
  try {
    const response = await AsyncStorage.getItem('@products_List');

    if (!response) return [];

    const unparsedValue: IProduto[] = JSON.parse(response);

    if (!unparsedValue.find((product) => product.id === idProduct))
      throw new Error('Esse produto não existe.', {
        cause: {
          name: 'notFound',
          message: 'O id não foi encontrado.',
        },
      });

    const listWithoutDeleteProduct = unparsedValue.filter(
      (product) => product.id !== idProduct
    );

    await AsyncStorage.setItem(
      '@products_List',
      JSON.stringify(listWithoutDeleteProduct)
    );
    setAvailableIds(idProduct);

    return listWithoutDeleteProduct;
  } catch (error: any) {
    const treatedError: Error = error;
    return treatedError;
  }
};

const updateProduct = async (value: IProduto): ResponseRequests => {
  try {
    const { estoque, nome, preco, precoTotal } = value;
    if (nome === '')
      throw new Error('Insira um nome válido.', {
        cause: {
          name: 'incorrectParam',
          message: 'A propriedade nome deve existir.',
        },
      });
    if (estoque === 0)
      throw new Error('Insira um estoque válido.', {
        cause: {
          name: 'incorrectParam',
          message: 'A propriedade estoque deve ser maior que 0.',
        },
      });
    if (preco === 0)
      throw new Error('Insira um preço válido.', {
        cause: {
          name: 'incorrectParam',
          message: 'A propriedade preco deve ser maior que 0.',
        },
      });
    if (precoTotal !== preco * estoque)
      throw new Error('Insira um preço total válido.', {
        cause: {
          name: 'incorrectParam',
          message:
            'O nome precoTotal deve ser, o preco do produto multiplicado pelo estoque.',
        },
      });

    const response = await AsyncStorage.getItem('@products_List');
    if (!response) return [];

    const unparsedValue: IProduto[] = JSON.parse(response);

    if (!unparsedValue.find((product) => product.id === value.id))
      throw new Error('Esse produto não existe.', {
        cause: {
          name: 'notFound',
          message: 'O id não foi encontrado.',
        },
      });

    const indexUpdateProduct = unparsedValue.findIndex(
      (product) => product.id === value.id
    );
    unparsedValue[indexUpdateProduct] = value;

    await AsyncStorage.setItem('@products_List', JSON.stringify(unparsedValue));

    return unparsedValue;
  } catch (error: any) {
    const treatedError: Error = error;
    return treatedError;
  }
};

export default {
  addProduct,
  setOrderList,
  setAvailableIds,
  deleteProduct,
  updateProduct,
  getProducts,
  getSortProductsByParams,
};
