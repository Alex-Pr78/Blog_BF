import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePostAsync } from '../../../../actions';
import { Input, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input value={titleValue} placeholder="Заголовок..." onChange={onTitleChange} />
			<div
				className="post-text"
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
			>
				{content}
			</div>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				editButton={<Icon id="fa-floppy-o" size="25px" onClick={onSave} />}
			/>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	display: flex;
	flex-direction: column;
	gap: 10px;

	& .post-text {
		min-height: 100px;
		border: 1px solid #000;
		border-radius: 5px;
		padding: 10px;
		white-space: pre-line;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
