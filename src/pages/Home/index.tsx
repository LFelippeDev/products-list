import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Wrapper } from './styles';
import { FormContainer } from '../../layouts/FormContainer';
import { ListContainer } from '../../layouts/ListContainer';

export default function Home() {
  return (
    <Wrapper>
      <FormContainer />
      <ListContainer />
      <StatusBar />
    </Wrapper>
  );
}
