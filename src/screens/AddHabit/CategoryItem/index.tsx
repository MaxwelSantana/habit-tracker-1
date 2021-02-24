import React from 'react';
import { CategoryType } from '../../../shared/types';
import { StyledView, StyledTitle, StyledDesc } from './styles';

const CategoryItem = ({ title, desc, img }: CategoryType) => (
  <StyledView>
    <StyledTitle>{title}</StyledTitle>
    <StyledDesc>{desc}</StyledDesc>
  </StyledView>
);

export default CategoryItem;
