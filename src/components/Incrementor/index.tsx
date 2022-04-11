import React, { useCallback, useState } from 'react';
import { Button, Container, TextButton, TextContainer } from './styles';

interface IIncrementorProps {
  value: number;
  setValue: (value: number) => void;
}

export const Incrementor = ({ value, setValue }: IIncrementorProps) => {
  const handleIncrementorValue = useCallback(
    (isIncrement: boolean) => {
      isIncrement ? setValue(value + 1) : setValue(value - 1);
    },
    [value, setValue]
  );
  return (
    <Container>
      <Button onPress={() => handleIncrementorValue(false)}>
        <TextButton>-</TextButton>
      </Button>
      <TextContainer>{value}</TextContainer>
      <Button onPress={() => handleIncrementorValue(true)}>
        <TextButton>+</TextButton>
      </Button>
    </Container>
  );
};
