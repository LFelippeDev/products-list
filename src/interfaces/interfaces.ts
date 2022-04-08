export interface IProduto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export enum IOrderList {
  ordenar = 'Ordenar',
  id = 'Id',
  nome = 'Nome',
  preco = 'Preço',
  estoque = 'Estoque',
  precoTotal = 'Preço Total',
}
