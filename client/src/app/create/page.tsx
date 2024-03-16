'use client';
import { useState } from 'react';
import { useNewPostsMutation } from '@/shared/api/use-new-post-mutation';
import CreatePost from '@/shared/ui/create-post';
interface props {}
export default function CreatePage({}: props) {
	return (
		<div className='flex flex-col items-center mx-auto justyfy-center p-12 overflow-y-hidden max-w-[84rem]'>
			<h1>Create New Post</h1>
			<CreatePost />
		</div>
	);
}
