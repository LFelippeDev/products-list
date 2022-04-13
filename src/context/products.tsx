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
});

export const ProductsProvider: React.FC = ({ children }) => {
  const [productsList, setProductsList] = useState<IProduto[]>();
  const [filteredList, setFilteredList] = useState<IProduto[]>();
  const [orderList, setOrderList] = useState<IOrderList>(IOrderList.ordenar);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const getProducts = useCallback(async () => {
    const response = await ManagementList.getProducts();
    if (response) setProductsList(response);
  }, [productsList]);

  const deleteProduct = useCallback(
    async (productId: number) => {
      const response = await ManagementList.deleteProduct(productId);
      if (response) setProductsList(response);
    },
    [setProductsList]
  );

  const createProduct = useCallback(
    async (addProduct: IProdutoNotCompleted) => {
      const response = await ManagementList.addProduct(addProduct);
      if (response) setProductsList(response);
    },
    [setProductsList]
  );

  const updateProduct = useCallback(
    async (product: IProduto) => {
      const response = await ManagementList.updateProduct(product);
      if (response) setProductsList(response);
    },
    [productsList]
  );

  const sortList = useCallback(
    (list: IProduto[]) => {
      switch (orderList) {
        case IOrderList.id:
          return list.sort((a, b) => a.id - b.id);
        case IOrderList.nome:
          return list.sort((a, b) => {
            if (a.nome > b.nome) return -1;
            if (a.nome < b.nome) return 1;
            return 0;
          });
        case IOrderList.preco:
          return list.sort((a, b) => a.preco - b.preco);
        case IOrderList.precoTotal:
          return list.sort((a, b) => a.precoTotal - b.precoTotal);
        case IOrderList.estoque:
          return list.sort((a, b) => a.estoque - b.estoque);
        default:
          return list;
      }
    },
    [orderList]
  );

  useEffect(() => {
    getProducts();
  }, []);

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
    setFilteredList(() => {
      if (!productsList) return;
      return sortList(productsList);
    });
  }, [orderList, productsList]);

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
  };
};
