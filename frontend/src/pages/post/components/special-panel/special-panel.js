import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../actions';
import { selectUserRole } from '../../../../selectors';
import { Icon } from '../../../../components';
import { ROLE } from '../../../../constants';
import { checkAccess } from '../../../../utils';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				title: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className="post-published">
				<div className="calendar">
					{publishedAt && (
						<Icon
							id="fa-calendar-o"
							margin="0 10px 0 0"
							size="20px"
							hover="#000"
							def={true}
						/>
					)}
					<div>{publishedAt}</div>
				</div>
				{isAdmin && (
					<div className="post-control-panel">
						{editButton}
						{publishedAt && (
							<Icon
								id="fa-trash-o"
								size="25px"
								hover="#b54518"
								onClick={() => onPostRemove(id)}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	flex-direction: column;

	& .post-published {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	& .pencil-edit {
		position: relative;
	}

	& .post-control-panel {
		align-items: center;
		display: flex;
		gap: 15px;
	}

	& .calendar {
		margin-left: 30px;
		display: flex;
		align-items: center;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
