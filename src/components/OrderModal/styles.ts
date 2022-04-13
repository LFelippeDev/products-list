import { View, Text } from 'react-native';
import styled from 'styled-components';

export const ModalWrapper = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ModalContent = styled(View)`
  background: ${({ theme }) => theme.colors.white};
  align-items: flex-start;
  justify-content: center;
  border: ${({ theme }) => theme.colors.primary_orange};
  border-radius: 18px;
  width: 300px;
  padding: 5px;
`;

export const TextList = styled(Text)`
  width: 100%;
  padding: 15px 20px;
  font-size: 16px;
`;

export const Divisor = styled(View)`
  width: 100%;
  height: 1px;
  background-color: #222;
`;
