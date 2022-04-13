import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  IOrderList,
  IProduto,
  IProdutoNotCompleted,
} from '../interfaces/interfaces';

const initAppStorage = async () => {
  const createdProductsList = await AsyncStorage.getItem('@products_List');
  if (!createdProductsList)
    await AsyncStorage.setItem('@products_List', JSON.stringify([]));
  const createdAvailableIds = await AsyncStorage.getItem('@available_Ids');
  if (!createdAvailableIds)
    await AsyncStorage.setItem('@available_Ids', JSON.stringify([]));
  // await AsyncStorage.clear();
  return true;
};

const addProduct = async (value: IProdutoNotCompleted) => {
  try {
    const responseProducts = await AsyncStorage.getItem('@products_List');
    if (!responseProducts) return;

    let unparsedProducts = JSON.parse(responseProducts);

    let responseIds = await getAvailableIds();
    if (!responseIds) return;
    const firstAvailableId = responseIds[0];

    if (responseIds.length > 0) {
      unparsedProducts.push({ id: firstAvailableId, ...value });
      responseIds.shift();
      await AsyncStorage.setItem('@available_Ids', JSON.stringify(responseIds));
    } else unparsedProducts.push({ id: unparsedProducts.length + 1, ...value });

    await AsyncStorage.setItem(
      '@products_List',
      JSON.stringify(unparsedProducts)
    );
    return unparsedProducts;
  } catch (e) {
    console.log(e);
  }
};

const setAvailableIds = async (idAvailable: number) => {
  try {
    const response = await AsyncStorage.getItem('@available_Ids');
    if (!response) return;

    if (response.length === 0) {
      await AsyncStorage.setItem(
        '@available_Ids',
        JSON.stringify([idAvailable])
      );
      return;
    }

    let unparsedValue: number[] = JSON.parse(response);
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

    if (!response) {
      return;
    }

    return JSON.parse(response);
  } catch (e) {
    console.log(e);
  }
};

const getSortProductsByParams = async (
  order: IOrderList
): Promise<IProduto[] | undefined> => {
  try {
    const response = await AsyncStorage.getItem('@products_List');
    if (!response) return;

    const unparsedValue: IProduto[] = JSON.parse(response);

    switch (order) {
      case IOrderList.id:
        return unparsedValue.sort((a, b) => a.id - b.id);
      case IOrderList.nome:
        return unparsedValue.sort((a, b) => {
          if (a.nome > b.nome) return -1;
          if (a.nome < b.nome) return 1;
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

const getAvailableIds = async (): Promise<number[] | undefined> => {
  try {
    const response = await AsyncStorage.getItem('@available_Ids');

    if (!response) {
      return;
    }

    return JSON.parse(response);
  } catch (e) {
    console.log(e);
  }
};

const deleteProduct = async (idProduct: number) => {
  try {
    const response = await AsyncStorage.getItem('@products_List');
    if (!response) return;

    const unparsedValue: IProduto[] = JSON.parse(response);
    const listWithoutDeleteProduct = unparsedValue.filter(
      (product) => product.id !== idProduct
    );

    await AsyncStorage.setItem(
      '@products_List',
      JSON.stringify(listWithoutDeleteProduct)
    );
    setAvailableIds(idProduct);

    return listWithoutDeleteProduct;
  } catch (e) {
    console.log(e);
  }
};

const updateProduct = async (value: IProduto) => {
  try {
    const response = await AsyncStorage.getItem('@products_List');
    if (!response) return;

    const unparsedValue: IProduto[] = JSON.parse(response);
    const indexUpdateProduct = unparsedValue.findIndex(
      (product) => product.id === value.id
    );
    unparsedValue[indexUpdateProduct] = value;

    await AsyncStorage.setItem('@products_List', JSON.stringify(unparsedValue));

    return unparsedValue;
  } catch (e) {
    console.log(e);
  }
};

export default {
  initAppStorage,
  addProduct,
  setOrderList,
  deleteProduct,
  updateProduct,
  getProducts,
  getSortProductsByParams,
};
