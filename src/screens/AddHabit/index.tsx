import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { MainStackParamList } from '../../stacks/MainStackParamList';
import Header from './Header';
import CategoryItem from './CategoryItem';
import FormName from './FormName';

type Props = {
  navigation: StackNavigationProp<MainStackParamList, 'NewHabit'>;
};

const StyledView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  justify-content: space-between;
`;

export default ({ navigation }: Props) => {
  const [habitName, setHabitName] = useState('');

  const goToCreateHabitScreen = () => navigation.navigate('MainTab');
  const handleChangeText = (text: string) => setHabitName(text);

  const categories = [
    { name: 'category 1', desc: 'desc 1', img: 'img 1' },
    { name: 'category 2', desc: 'desc 2', img: 'img 2' },
  ];

  return (
    <StyledView>
      <Header title="Novo Habito" back={goToCreateHabitScreen} />
      <FormName
        value={habitName}
        handleChangeText={handleChangeText}
        handleSubmit={goToCreateHabitScreen}
      />
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem name={item.name} desc={item.desc} img={item.img} />}
        keyExtractor={({ name }) => name}
      />
    </StyledView>
  );
};
