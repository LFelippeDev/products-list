export interface IProduto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  precoTotal: number;
}

export enum IOrderList {
  ordenar = 'Ordenar',
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
  deleteProduct: (id: number) => void;
  createProduct: (product: IProdutoNotCompleted) => void;
  updateProduct: (product: IProduto) => void;
  setSearchFilter: (value: string) => void;
}

export interface IField {
  value: string | number;
  isInvalid: boolean;
}
