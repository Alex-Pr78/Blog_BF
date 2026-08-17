import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h3>{title}</h3>
					<div className="post-card-info">
						<div className="published-at">
							<Icon
								id="fa-calendar-o"
								margin="0 10px 0 0"
								size="20px"
								hover="#000"
								def={true}
							/>
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon
								id="fa-comment-o"
								margin="0 10px 0 0"
								size="20px"
								hover="#000"
								def={true}
							/>
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 5px 8px 8px 0px rgba(0, 0, 0, 0.1);
	transition: all 0.4s ease-in-out;

	& img {
		width: 100%;
		border-radius: 10px 10px 0 0;
		height: 200px;
	}

	& h3 {
		width: 300px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 10px 10px 0 10px;
		line-height: 1.3;
		font-size: 16px;
	}

	& .post-card-footer {
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	& .post-card-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
	}

	& .published-at,
	.comments-count {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	&:hover {
		box-shadow: 5px 8px 8px 0px rgba(0, 0, 0, 0.6);
	}

	@media (max-width: 780px) {
		& img {
			width: 100%;
			border-radius: 10px 10px 0 0;
			height: 300px;
		}

		& h3 {
			font-size: 30px;
		}
	}

	@media (max-width: 560px) {
		margin: 0 auto;
		& img {
			width: 650px;
			border-radius: 10px 10px 0 0;
			height: 440px;
		}

		& .post-card-footer {
			height: 150px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		& h3 {
			font-size: 36px;
		}
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
