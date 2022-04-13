import React, { Fragment } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useProducts } from '../../context/products';
import { IOrderList } from '../../interfaces/interfaces';
import { Divisor, ModalContent, ModalWrapper, TextList } from './styles';

interface IOrderModalProps {
  isVisible: boolean;
  setClose: () => void;
}

export const OrderModal = ({ isVisible, setClose }: IOrderModalProps) => {
  const { setOrderList } = useProducts();
  const OrderList = [
    { nome: IOrderList.id },
    { nome: IOrderList.preco },
    { nome: IOrderList.precoTotal },
    { nome: IOrderList.estoque },
    { nome: IOrderList.nome },
    { nome: IOrderList.ordenar },
  ];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={setClose}
      style={styles.container}
    >
      <ModalWrapper>
        <ModalContent>
          {OrderList.map((item) => (
            <Fragment key={`ModalList:${item.nome}`}>
              <TextList
                onPress={() => {
                  setOrderList(item.nome);
                  setClose();
                }}
              >
                {item.nome}
              </TextList>
              {item.nome !== IOrderList.ordenar && <Divisor />}
            </Fragment>
          ))}
        </ModalContent>
      </ModalWrapper>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
