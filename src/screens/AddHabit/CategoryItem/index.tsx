import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { CategoryType } from '../../../shared/types';

const StyledView = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  margin-bottom: 20px;
  height: 120px;
  border-radius: 10px;
  padding-left: 16px;
  padding-top: 35px;
  padding-bottom: 35px;
  elevation: 5;
`;

const StyledTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.text};
`;

const CategoryItem = ({ title, desc, img }: CategoryType) => (
  <StyledView>
    <StyledTitle>{title}</StyledTitle>
    <Text>{desc}</Text>
  </StyledView>
);

export default CategoryItem;
