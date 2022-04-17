import styled from 'styled-components';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  padding: 10px;
  padding-bottom: 40px;
  background: ${({ theme }) => theme.colors.secundary_orange};
`;

export const OrderContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 15px;
`;

export const OrderText = styled(Text)`
  color: ${({ theme }) => theme.colors.list_text};
  font-family: 'Bold';
  font-size: 14px;
  margin-right: 5px;
`;

export const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;
