import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { CategoryType } from '../../../shared/types';

export const StyledSectionTitle = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.onBackground};
  opacity: 0.8;
`;

export const StyledView = styled.View`
  margin-left: 16px;
  margin-right: 16px;
`;

export const StyledFlatList = styled(FlatList as new () => FlatList<CategoryType>)`
  margin-top: 10px;
`;
