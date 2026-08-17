import { useEffect, useState, useMemo } from 'react';
import { PAGINATION_LIMIT } from '../../constants';
import { PostCard, Pagination, Search } from './components';
import { debounce } from './utils/debounce';
import styled from 'styled-components';
import { request } from '../../utils/request';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		request(
			`/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setTotalPages(lastPage);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(true);
	};

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{posts.length ? (
				<div className="post-list">
					{posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							publishedAt={publishedAt}
							commentsCount={comments.length}
						/>
					))}
				</div>
			) : (
				<div className="no-post-found">Статьи не найдены</div>
			)}
			{totalPages > 1 && (
				<Pagination setPage={setPage} page={page} totalPages={totalPages} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
		padding: 20px;
	}

	& .no-post-found {
		text-align: center;
		font-size: 20px;
		padding: 40px;
	}

	@media (max-width: 780px) {
		& .post-list {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
			gap: 20px;
			padding: 50px;
		}
	}

	@media (max-width: 560px) {
		& .post-list {
			display: flex;
			flex-direction: column;
		}
	}
`;
