import React, { useContext } from 'react';
import { BackIcon } from '../../../icons';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import DefaultText from '../../../components/DefaultText';

const HeaderView = styled.View`
	align-items: center;
	height: 44px;
	justify-content: center;
	margin: 10px;
`;

const HeaderTitle = styled(DefaultText)`
	color: ${props => props.theme.colors.text};
	font-size: 16px;
`;

const HeaderLeftBackbutton = styled.TouchableOpacity`
	justify-content: center;
	left: 0;
	position: absolute;
`;

const Header = ({ title, back, }: { title: string; back: () => void; }) => {
	const { colors, } = useContext(ThemeContext);
	return (
		<HeaderView>
			<HeaderTitle>{title}</HeaderTitle>
			<HeaderLeftBackbutton onPress={back}>
				<BackIcon size={24} color={colors.text} />
			</HeaderLeftBackbutton>
		</HeaderView>
	);
};

export default Header;