import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors';
import { Content } from '../../components';
import { PostContent, Comments, PostForm } from './components';
import { Error } from '../../error';
import styled from 'styled-components';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch,  params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	return error ? (
		<Error error={error} />
	) : isCreating || isEditing ? (
		<Content access={[ROLE.ADMIN]}>
			<div className={className}>
				<PostForm post={post} />
			</div>
		</Content>
	) : (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};

export const Post = styled(PostContainer)`
	min-height: 100vh;
	padding: 40px 80px;

	& .is-loading {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
