import styled from 'styled-components';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  padding: 25px;
  background: ${({ theme }) => theme.colors.secundary_orange};
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
`;

export const OrderContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const OrderText = styled(Text)`
  color: ${({ theme }) => theme.colors.list_text};
  font-family: 'Bold';
  font-size: 14px;
  margin-right: 5px;
`;

export const StyledScrollView = styled(ScrollView)``;

export const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;
