import { TextInput, View, Text } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
  margin-bottom: 5px;
  margin-right: 10px;
`;

export const Input = styled(TextInput)`
  background: ${({ theme }) => theme.colors.input_background};
  border-radius: 16px;
  height: 50px;
  padding-left: 20px;
`;

export const Label = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.input_label};
  margin-bottom: 3px;
`;
