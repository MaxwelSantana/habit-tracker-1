import React from 'react';
import styled from 'styled-components/native';
import { CategoryType } from '../../../shared/types';
import { ViewContainer, StyledTitle, StyledDesc } from './styles';

const ImageContainer = styled.View`
  flex: 1;
  margin-top: -10;
`;

const TextContainer = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-top: 35px;
  padding-bottom: 35px;
`;

const CategoryItem = ({ title, desc, img }: CategoryType) => (
  <ViewContainer>
    <TextContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledDesc>{desc}</StyledDesc>
    </TextContainer>
    <ImageContainer>
      {img()}
    </ImageContainer>
  </ViewContainer>
);

export default CategoryItem;
