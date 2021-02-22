import React from 'react';
import { Text } from 'react-native';

const CategoryItem = ({ name, desc, img }: { name: string; desc: string; img: string }) => (
  <>
    <Text>{name}</Text>
    <Text>{desc}</Text>
    <Text>{img}</Text>
  </>
);

export default CategoryItem;
