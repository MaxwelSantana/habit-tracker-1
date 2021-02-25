import styled from 'styled-components/native';

export const ViewContainer = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  margin-top: 10px;
  margin-bottom: 20px;
  height: 120px;
  border-radius: 10px;
  elevation: 5;
  flex-direction: row;
  justify-content: space-between;
`;
export const StyledTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.onBackground};
  font-family: ${(props) => props.theme.fonts.bold.fontFamily};
  font-weight: ${(props) => props.theme.fonts.bold.fontWeight};
`;
export const StyledDesc = styled.Text`
  font-size: 14px;
  opacity: 0.45;
  color: ${(props) => props.theme.colors.onBackground};
  font-family: ${(props) => props.theme.fonts.bold.fontFamily};
  font-weight: ${(props) => props.theme.fonts.bold.fontWeight};
`;
