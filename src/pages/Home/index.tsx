import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ListContainer, Wrapper } from './styles';
import { FormContainer } from '../../layouts/FormContainer';

export default function Home() {
  return (
    <Wrapper>
      <FormContainer />
      <ListContainer />
      <StatusBar />
    </Wrapper>
  );
}
