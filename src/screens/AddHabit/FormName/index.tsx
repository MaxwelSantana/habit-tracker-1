import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NextIcon } from '../../../icons';

const StyledView = styled.View`
  flex: 1;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
`;
const StyledInputName = styled(Input)`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
`;

const FormName = ({
  value,
  handleChangeText,
  handleSubmit,
}: {
  value: string;
  handleChangeText: (text: string) => void;
  handleSubmit: () => void;
}) => {
  const { colors } = useContext(ThemeContext);
  return (
    <StyledView>
      <StyledInputName
        value={value}
        onChangeText={handleChangeText}
        placeholder="Crie o seu"
        rightIcon={
          <TouchableOpacity onPress={handleSubmit}>
            <NextIcon size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />
    </StyledView>
  );
};

export default FormName;