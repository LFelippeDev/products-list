export interface IProduto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  precoTotal: number;
}

export enum IOrderList {
  ordenar = 'Ordenação Customizável',
  id = 'Id',
  nome = 'Nome',
  preco = 'Preço',
  estoque = 'Estoque',
  precoTotal = 'Preço Total',
}

export interface IProdutoNotCompleted {
  nome: string;
  preco: number;
  precoTotal: number;
  estoque: number;
}

export interface IProductsContext {
  productsList?: IProduto[];
  filteredList?: IProduto[];
  orderList: IOrderList;
  searchFilter: string;
  deleteProduct: (id: number) => void;
  createProduct: (product: IProdutoNotCompleted) => void;
  updateProduct: (product: IProduto) => void;
  setSearchFilter: (value: string) => void;
  setOrderList: (order: IOrderList) => void;
}

export interface IField {
  value: string;
  isInvalid: boolean;
}
