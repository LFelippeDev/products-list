import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import {
  IOrderList,
  IProductsContext,
  IProduto,
  IProdutoNotCompleted,
} from '../interfaces/interfaces';
import ManagementList from '../services/products';

const ProductsContext = createContext<IProductsContext>({
  filteredList: [],
  orderList: IOrderList.ordenar,
  searchFilter: '',
  deleteProduct: () => {},
  createProduct: () => {},
  updateProduct: () => {},
  setSearchFilter: () => {},
  setOrderList: () => {},
  setCustomOrderedList: () => {},
});

export const ProductsProvider: React.FC = ({ children }) => {
  const [productsList, setProductsList] = useState<IProduto[]>([]);
  const [filteredList, setFilteredList] = useState<IProduto[]>([]);
  const [orderList, setOrderList] = useState<IOrderList>(IOrderList.ordenar);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const getProducts = useCallback(async () => {
    const response = await ManagementList.getProducts();
    if (response instanceof Error) console.log(response.message);
    if (response && !(response instanceof Error)) setProductsList(response);
  }, [productsList]);

  const deleteProduct = useCallback(
    async (productId: number) => {
      const response = await ManagementList.deleteProduct(productId);
      if (response instanceof Error) console.log(response.message);
      if (response && !(response instanceof Error)) setProductsList(response);
    },
    [setProductsList]
  );

  const createProduct = useCallback(
    async (addProduct: IProdutoNotCompleted) => {
      const response = await ManagementList.addProduct(addProduct);
      if (response instanceof Error) console.log(response.message);
      if (response && !(response instanceof Error)) setProductsList(response);
    },
    [setProductsList]
  );

  const setCustomOrderedList = useCallback(
    async (newOrderList: IProduto[]) => {
      setFilteredList(newOrderList);
      const response = await ManagementList.setOrderList(newOrderList);
      if (response) setProductsList(newOrderList);
    },
    [productsList]
  );

  const updateProduct = useCallback(
    async (product: IProduto) => {
      const response = await ManagementList.updateProduct(product);
      if (response instanceof Error) console.log(response.message);
      if (response && !(response instanceof Error)) setProductsList(response);
    },
    [productsList]
  );

  const getProductsByParams = useCallback(async () => {
    const response = await ManagementList.getSortProductsByParams(orderList);
    if (response instanceof Error) console.log(response.message);
    if (response && !(response instanceof Error)) setFilteredList(response);
  }, [orderList]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProductsByParams();
  }, [orderList]);

  useEffect(() => {
    setFilteredList(
      productsList?.filter((product) => {
        const lengthSearchFilter = searchFilter.length;
        return (
          product.nome.slice(0, lengthSearchFilter).toLowerCase() ===
          searchFilter.toLowerCase()
        );
      })
    );
    if (searchFilter === '') setFilteredList(productsList);
  }, [searchFilter]);

  useEffect(() => {
    if (!productsList) return;

    orderList !== IOrderList.ordenar
      ? getProductsByParams()
      : setFilteredList(productsList);
  }, [productsList]);

  return (
    <ProductsContext.Provider
      value={{
        productsList,
        filteredList,
        searchFilter,
        orderList,
        deleteProduct,
        createProduct,
        updateProduct,
        setSearchFilter,
        setOrderList,
        setCustomOrderedList,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  const {
    filteredList,
    orderList,
    searchFilter,
    deleteProduct,
    createProduct,
    updateProduct,
    setSearchFilter,
    setOrderList,
    setCustomOrderedList,
  } = context;

  return {
    filteredList,
    orderList,
    searchFilter,
    deleteProduct,
    createProduct,
    updateProduct,
    setSearchFilter,
    setOrderList,
    setCustomOrderedList,
  };
};
