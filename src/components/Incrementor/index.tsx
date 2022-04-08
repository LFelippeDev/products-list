import React, { useCallback, useState } from 'react';
import { Button, Container, TextButton, TextContainer } from './styles';

interface IIncrementorProps {
  value: number;
}

export const Incrementor = ({ value }: IIncrementorProps) => {
  const [incrementorValue, setIncrementorValue] = useState<number>(value);

  const handleIncrementorValue = useCallback(
    (isIncrement: boolean) => {
      isIncrement
        ? setIncrementorValue(incrementorValue + 1)
        : setIncrementorValue(incrementorValue - 1);
    },
    [incrementorValue]
  );
  return (
    <Container>
      <Button onPress={() => handleIncrementorValue(false)}>
        <TextButton>-</TextButton>
      </Button>
      <TextContainer>{incrementorValue}</TextContainer>
      <Button onPress={() => handleIncrementorValue(true)}>
        <TextButton>+</TextButton>
      </Button>
    </Container>
  );
};
