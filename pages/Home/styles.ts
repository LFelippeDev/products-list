import styled from 'styled-components';
import { View } from 'react-native';

export const Wrapper = styled(View)`
  background: transparent;
  flex: 1;
  display: flex;
`;

export const FormContainer = styled(View)`
  flex: 0.45;
`;

export const ListContainer = styled(View)`
  flex: 0.55;
  background: ${({ theme }) => theme.colors.secundary_orange};
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
`;
