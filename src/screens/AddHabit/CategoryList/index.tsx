import React from 'react';
import { CategoryType } from '../../../shared/types';
import CategoryItem from '../CategoryItem';
import { StyledFlatList, StyledSectionTitle, StyledView } from './styles';

type CategoryListProps = {
  categories: Array<CategoryType>;
};

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <StyledView>
      <StyledSectionTitle>CATEGORIAS</StyledSectionTitle>
      <StyledFlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem title={item.title} desc={item.desc} img={item.img} />
        )}
        keyExtractor={({ title: name }) => name}
      />
    </StyledView>
  );
};
export default CategoryList;
