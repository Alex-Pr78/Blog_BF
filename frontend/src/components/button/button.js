import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, margin, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	margin: ${({ margin = '0 auto' }) => margin};
	cursor: pointer;
	color: #000;
	font-size: 14px;
	font-weight: 700;
	padding: 5px 15px;
	border: 2px solid #000;
	border-radius: 5px;
	transition: all 0.3s ease-in-out;

	&:hover {
		background: ${({ hover = '#2864a0' }) => hover};
		color: #fff;
	}

	&:disabled {
		background: #fff;
		color: #fff;
		cursor: default;
		border: none;
	}

	@media (max-width: 560px) {
		width: 100%;
		height: 60px;
		font-size: 20px;
		padding: 10px;
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
	margin: PropTypes.string,
};
