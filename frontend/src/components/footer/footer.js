import styled from 'styled-components';

const Discription = styled.div`
	font-size: 12px;
	line-height: 12px;
	margin-top: 12px;
	color: #fff;
`;

const FooterContainer = ({ className }) => (
	<footer className={className}>
		<Discription>
			Веб-технологии<br />
			Написание кода<br />
			Расбор ошибок
		</Discription>
		<Discription>
			<div>Блог разработчика</div>
			<div>Контакты</div>
		</Discription>
	</footer>
);

export const Footer = styled(FooterContainer)`
	
   display: flex;
	justify-content: space-between;
	top: 0;
	width: 1000px;
	padding: 20px 30px;
	background: #000000de;
	height: 120px;
	font-size: 36px;
	fwont-weight: 700;
	box-shadow: 0px 0 10px 5px rgba(0, 0, 0, 0.3);
`;
