import React from 'react';
import { AlertText, Container } from './styles';

interface IAlertWithoutData {
  text: string;
}

export const AlertWithoutData = ({ text }: IAlertWithoutData) => {
  return (
    <Container>
      <AlertText>{text}</AlertText>
    </Container>
  );
};
