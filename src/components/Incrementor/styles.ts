import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled(TouchableOpacity)`
  background: ${({ theme }) => theme.colors.primary_orange};
  border-radius: 50px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
`;

export const TextContainer = styled(Text)`
  color: ${({ theme }) => theme.colors.list_text};
  font-family: 'Bold';
  font-size: 20px;
  margin: 0 5px;
`;
