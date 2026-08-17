import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, CLOSE_MODAL, removeCommentAsync } from '../../../../../../actions';
import { Icon } from '../../../../../../components';
import { selectUserRole } from '../../../../../../selectors';
import { ROLE } from '../../../../../../constants';
import styled from 'styled-components';

const CommentContainer = ({
	className,
	id,
	postId,
	author,
	publishedAt,
	content,
	isAuthor,
}) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				title: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);
	const canDelete = isAdminOrModerator;

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							className="user-avatar"
							id="fa-user-circle-o"
							size="25px"
							hover="#000"
							def={true}
						/>
						{author}
					</div>
					<div className="published-at">
						{publishedAt}
						<Icon id="fa-calendar-o" size="25px" hover="#000" def={true} />
					</div>
				</div>
				<div className="comment-text">{content}</div>
				{isAuthor && (
					<div className="delete-comment" onClick={() => onCommentRemove(id)}>
						Удалить комментарий
					</div>
				)}
			</div>
			{canDelete && (
				<Icon
					id="fa-trash-o"
					size="25px"
					hover="#b54518"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;

	& .comment {
		display: flex;
		flex-direction: column;
		padding: 10px;
		width: 500px;
		box-shadow: 5px 8px 8px 0px rgba(0, 0, 0, 0.3);
		margin: 5px 15px 5px ${(props) => (props.isAuthor ? '35px' : '0')};
		border-radius: 5px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		align-items: center;
	}

	& .author {
		display: flex;
		align-items: center;
		color: #2864a0;
		gap: 5px;
	}

	& .published-at {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	& .delete-comment {
		cursor: pointer;
		font-size: 12px;
		margin-top: 10px;
		color: #b54518;
		align-self: end;
	}
`;

Comment.propTypes = {
	id: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	isAuthor: PropTypes.bool,
};
