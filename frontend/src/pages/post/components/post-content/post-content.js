import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<div className="header">
				{imageUrl && <img className='img-post' src={imageUrl} alt={title} />}
				<div className="post-title">
					<h2>{title}</h2>
					<SpecialPanel
						id={id}
						publishedAt={publishedAt}
						editButton={
							<Icon
								className="pencil-edit"
								id="fa-pencil-square-o"
								size="25px"
								onClick={() => navigate(`/post/${id}/edit`)}
							/>
						}
					/>
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& .header {
		display: flex;

	}

	& .post-title {
		display: flex;
		flex-direction: column;
		min-width: 500px;
		justify-content: space-between;
	}

	& h2 {
		margin: 0 0 30px 30px;
	}

	& .pencil-edit {
		position: relative;
		top: 3px;
	}

	& .post-text {
		margin-top: 30px;
		white-space: pre-line;
	}

	& .img-post {
		width: 300px;
		height: 200px;
		border-radius: 10px;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
}