import React from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { Container, Input, Label } from './styles';

interface IFormInputProps {
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLenght?: number;
}

export const FormInput = ({
  label,
  placeholder,
  keyboardType,
  maxLenght,
}: IFormInputProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Input
        keyboardType={keyboardType}
        placeholder={placeholder}
        maxLength={maxLenght}
      />
    </Container>
  );
};
