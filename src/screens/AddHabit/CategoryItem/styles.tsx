import styled from 'styled-components/native';

export const StyledView = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  margin-bottom: 20px;
  height: 120px;
  border-radius: 10px;
  padding-left: 16px;
  padding-top: 35px;
  padding-bottom: 35px;
  elevation: 5;
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
