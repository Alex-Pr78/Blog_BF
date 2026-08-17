import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, page, setPage, totalPages }) => {
	const isFirstPage = page === 1;
	const isLastPage = page === totalPages;

	return (
		<div className={className}>
			<Button
				hover="#000"
				width="120px"
				margin="0"
				onClick={() => setPage(1)}
				disabled={isFirstPage}
			>
				В начало
			</Button>
			<Button
				width="120px"
				margin="0"
				onClick={() => setPage(page - 1)}
				disabled={isFirstPage}
			>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button
				width="120px"
				margin="0"
				onClick={() => setPage(page + 1)}
				disabled={isLastPage}
			>
				Следующая
			</Button>
			<Button
				hover="#000"
				width="120px"
				margin="0"
				onClick={() => setPage(totalPages)}
				disabled={isLastPage}
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin-top: 20px;

	& Button {
		border: none;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
