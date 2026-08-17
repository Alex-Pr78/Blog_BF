import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, def, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '33px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#fff' : '#000')};

	&:hover {
		color: ${({ hover = '#2864a0' }) => hover};
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		opacity: ${({ disabled }) => (disabled ? 0 : 1)};
		cursor: ${({ def }) => (def ? 'default' : 'pointer')};
	}
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	def: PropTypes.bool,
}
