import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { MainStackParamList } from '../../stacks/MainStackParamList';
import Header from './Header';
import FormName from './FormName';

import CategoryList from './CategoryList';
import { CategoryType } from '../../shared/types';

type AddHabitProps = {
  navigation: StackNavigationProp<MainStackParamList, 'NewHabit'>;
};

const StyledView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const AddHabit = ({ navigation }: AddHabitProps) => {
  const [habitName, setHabitName] = useState('');

  const goToCreateHabitScreen = () => navigation.navigate('MainTab');
  const handleChangeText = (text: string) => setHabitName(text);

  const categories: Array<CategoryType> = [
    { title: 'Atividades em casa', desc: 'Use esse tempo para fazer algo novo', img: 'img 1' },
    { title: 'Corpo saudável', desc: 'Base do seu bem-estar', img: 'img 2' },
    { title: 'Aprenda e explore', desc: 'Fique com fome de conhecimento', img: 'img 2' },
  ];

  return (
    <StyledView>
      <Header title="Novo Habito" back={goToCreateHabitScreen} />
      <FormName
        value={habitName}
        handleChangeText={handleChangeText}
        handleSubmit={goToCreateHabitScreen}
      />
      <CategoryList categories={categories} />
    </StyledView>
  );
};

export default AddHabit;
