import styled from 'styled-components';
import { Logo, ControlPanel } from './components';

const Discription = styled.div`
	font-size: 18px;
	line-height: 18px;
	margin-top: 12px;
	font-style: italic;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>
			Веб-технологии
			<br />
			Написание кода
			<br />
			Расбор ошибок
		</Discription>
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	padding: 20px 30px;
	background: #fff;
	height: 120px;
	font-size: 36px;
	font-weight: 700;
	box-shadow: 0 0 10px 15px rgba(0, 0, 0, 0.3);
	z-index: 10;
`;
