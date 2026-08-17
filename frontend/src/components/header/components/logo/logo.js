import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const LargeText = styled.div`
	font-size: 36px;
	color: #2864a0;
	fwont-weight: 600;
	line-height: 30px;
	margin-top: 19px;
`;
const SmallText = styled.div`
	font-size: 18px;
	fwont-weight: 400;
`;

const LogoContainer = ({ className }) => {
	return (
		<div className={className}>
			<Link to="/">
				<Icon id="fa-code" size="63px" margin="0 20px 0 0" hovercolor="#ad2500" />
			</Link>
			<div>
				<LargeText>Блог</LargeText>
				<SmallText>веб-разработчика</SmallText>
			</div>
		</div>
	);
};

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
	margin-top: -25px;
	height: 120px;
	font-size: 36px;
	fwont-weight: 700;
`;
