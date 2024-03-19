import * as React from 'react';
import * as Form from '@radix-ui/react-form';
import { Button } from '@/shared/ui/button';
import { useNewPostsMutation } from '@/shared/api/use-new-post-mutation';

const CreatePost: React.FC = () => {
	const [formData, setFormData] = React.useState({
		title: '',
		content: '',
		tags: '',
		author: '',
	});
	const [serverErrors, setServerErrors] = React.useState({
		title: false,
		content: false,
		tags: false,
		author: false,
	});
	const [createPost, { loading, error }] = useNewPostsMutation();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const { data } = await createPost({
				variables: formData,
			});
			console.log('New post created:', data.newPost);
		} catch (error) {
			console.error('Error creating post:', error);
		}
	};

	return (
		<Form.Root onSubmit={handleSubmit}>
			<div className='flex flex-col gap-8 w-[32rem]'>
				<div className=''>
					<label htmlFor='title'>Title:</label>
					<Form.Field
						name='title'
						serverInvalid={serverErrors.title}
						className='border-2 rounded-sm'
					>
						<Form.Control
							className='p-2 text-black w-full'
							value={formData.title}
							onChange={e =>
								setFormData({ ...formData, title: e.target.value })
							}
							required
						/>
						{serverErrors.title && (
							<Form.Message>Please enter your title.</Form.Message>
						)}
					</Form.Field>
				</div>
				<div>
					<label htmlFor='content'>Content:</label>
					<Form.Field
						name='content'
						serverInvalid={serverErrors.content}
						className='border-2 rounded-sm'
					>
						<Form.Control
							className='p-2 wrap text-black w-full overflow-y-auto'
							value={formData.content}
							onChange={e =>
								setFormData({ ...formData, content: e.target.value })
							}
							required
						/>
						{serverErrors.content && (
							<Form.Message>Please enter your content.</Form.Message>
						)}
					</Form.Field>
				</div>
				<div>
					<label htmlFor='tags'>Tags:</label>
					<Form.Field
						name='tags'
						serverInvalid={serverErrors.tags}
						className='border-2 rounded-sm'
					>
						<Form.Control
							className='p-2 text-black w-full'
							value={formData.tags}
							onChange={e => setFormData({ ...formData, tags: e.target.value })}
							required
						/>
						{serverErrors.tags && (
							<Form.Message>Please enter your tags.</Form.Message>
						)}
					</Form.Field>
				</div>
				<div>
					<label htmlFor='author'>Author:</label>
					<Form.Field
						name='author'
						serverInvalid={serverErrors.author}
						className='border-2 rounded-sm'
					>
						<Form.Control
							className='p-2 text-black w-full'
							value={formData.author}
							onChange={e =>
								setFormData({ ...formData, author: e.target.value })
							}
							required
						/>
						{serverErrors.author && (
							<Form.Message>Please enter your author.</Form.Message>
						)}
					</Form.Field>
				</div>
				<Button type='submit' disabled={loading}>
					Create Post
				</Button>
				{error && <p>Error: {error.message}</p>}
			</div>
		</Form.Root>
	);
};

export default CreatePost;