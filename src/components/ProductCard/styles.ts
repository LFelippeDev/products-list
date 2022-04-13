import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

interface ICardTextProps {
  color?: string;
  fontSize: number;
  fontFamily: string;
}

interface IContainer {
  isActive?: boolean;
}

export const Container = styled(TouchableOpacity)<IContainer>`
  margin-bottom: 8px;
  border-radius: 20px;
  margin: 5px 15px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-between;
  elevation: ${({ isActive }) => (isActive ? 10 : 0)};
`;

export const Header = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Main = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Footer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Divisor = styled(View)`
  height: 1px;
  background: #d9d8d8;
  margin: 10px 0;
`;

export const CardText = styled(Text)<ICardTextProps>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ color, theme }) => color || theme.colors.list_text};
  font-family: ${({ fontFamily }) => fontFamily};
  margin-right: 5px;
`;

export const DeleteProductText = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
`;
