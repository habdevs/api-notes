'use client';
import { usePostsQuery } from '@/shared/api/use-post-query';
import { Button } from '@/shared/ui/button/button';
import { useState } from 'react';

export default function Home() {
	const [fetchStatus, setFetchStatus] = useState('idle');
	const { loading, error, data, refetch } = usePostsQuery();

	const handleButtonClick = async () => {
		setFetchStatus('loading');
		console.log('loading');
		try {
			await refetch({ forceFetch: true });
			setFetchStatus('success');
			console.log('success');
		} catch (error) {
			console.error('Error while refetching:', error);
			setFetchStatus('error');
		}
	};

	return (
		<main className='flex flex-col items-center justify-between p-24'>
			<div>
				<Button
					variant='primary'
					size='default'
					onClick={handleButtonClick}
					disabled={fetchStatus === 'loading'}
				>
					{fetchStatus === 'loading' ? 'Loading...' : 'Get Post'}
				</Button>
			</div>
			{fetchStatus === 'error' && (
				<div>
					<h2>Error: Failed to fetch posts. Please try again.</h2>
				</div>
			)}
			{fetchStatus === 'success' && (
				<div>
					<h2>Posts successfully fetched!</h2>
				</div>
			)}
			{data && (
				<div>
					<h2>Posts</h2>
				</div>
			)}
			<div>
				<ul>
					{data &&
						data.posts.map((post: any) => (
							<li key={post.id}>
								<h3>{post.title}</h3>
								<p>{post.content}</p>
							</li>
						))}
				</ul>
			</div>
		</main>
	);
}
