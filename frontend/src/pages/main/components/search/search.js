import PropTypes from 'prop-types';
import { Input, Icon } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input value={searchPhrase} placeholder="Поиск статьи..." onChange={onChange} />
			<Icon id="fa-search" size="20px" hover="#000" def={true} />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 300px;
	height: 40px;
	margin: 40px auto 10px;

	& > input {
		padding: 0 40px 0 10px;
		border: none;
		box-shadow: 5px 8px 8px 0px rgba(0, 0, 0, 0.1);
	}

	& > input:focus {
		font-size: 20px;
		outline: none;
		box-shadow: 5px 8px 8px 0px rgba(0, 0, 0, 0.5);
	}

	& > div {
		position: absolute;
		right: 12px;
		top: 5px;
	}

	@media (max-width: 560px) {
		width: 500px;
		& > input {
			font-size: 30px;
			height: 60px;
		}
			
		& > input:focus {
		font-size: 30px;
	}
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
