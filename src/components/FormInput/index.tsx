import React from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { Container, Input, Label } from './styles';

interface IFormInputProps {
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLenght?: number;
  isInvalid?: boolean;
  value?: string;
  onChangeText?: (value: string) => void;
}

export const FormInput = ({
  label,
  placeholder,
  keyboardType,
  maxLenght,
  onChangeText,
  isInvalid,
  value,
}: IFormInputProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Input
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        maxLength={maxLenght}
        onChangeText={onChangeText}
        isInvalid={isInvalid}
      />
    </Container>
  );
};
