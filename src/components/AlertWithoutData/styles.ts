import { View, Text } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AlertText = styled(Text)`
  color: ${({ theme }) => theme.colors.principal_text};

  font-size: 16px;
`;
