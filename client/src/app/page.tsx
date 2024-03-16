'use client';
import { usePostsQuery } from '@/shared/api/use-post-query';
import { Button } from '@/shared/ui/button';
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
		<main className='flex flex-col items-center mx-auto p-12 overflow-y-hidden max-w-[84rem]'>
			<div className='p-2'>
				<Button
					variant='primary'
					size='default'
					onClick={handleButtonClick}
					disabled={fetchStatus === 'loading'}
				>
					{fetchStatus === 'loading' ? 'Loading...' : 'Get Post'}
				</Button>
			</div>
			{data && (
				<div className='p-2 flex'>
					<h2>Message: </h2>
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
				</div>
			)}
			<div>
				<ul className='flex flex-wrap min-h-screen overflow-y-hidden justify-start'>
					{data &&
						data.posts.map((post: any) => (
							<li key={post.id} className='p-6 border rounded-xl m-2'>
								<h3>{post.title}</h3>
								<p>{post.content}</p>
								<p>{post.author}</p>
							</li>
						))}
				</ul>
			</div>
		</main>
	);
}
