import styled from 'styled-components';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

interface IContainer {
  inSearching: boolean;
}

export const Container = styled(View)<IContainer>`
  min-height: ${({ inSearching }) => (inSearching ? '370' : '120')}px;
  padding: 25px;
  padding-top: 0;
  margin-top: ${StatusBar.currentHeight}px;
  display: flex;
  justify-content: center;
`;

export const ContainerTitle = styled(Text)`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.principal_text};
  font-family: 'Bold';
`;
export const ContainerSubTitle = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.principal_text};
  font-family: 'Medium';
`;

export const ContainerFooter = styled(View)`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  margin-bottom: 5px;
`;

export const ButtonContainer = styled(View)`
  margin-top: 10px;
`;
export const Button = styled(TouchableOpacity)`
  background: ${({ theme }) => theme.colors.primary_orange};
  height: 50px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-family: 'Medium';
`;
