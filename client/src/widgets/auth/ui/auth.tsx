'use client';
import React, { FormEvent, useState } from 'react';
import { useSignUp } from '@/shared/api/signup';
import { useSignIn } from '@/shared/api/signin';
import * as Form from '@radix-ui/react-form';
import { Button } from '@/shared/ui/button';
const Auth: React.FC = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [serverErrors, setServerErrors] = useState<{ [key: string]: any }>({});

	const signUp = useSignUp();
	const signIn = useSignIn();

	const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await signUp({ username, email, password });
			if (response) {
				console.log('Sign Up Response:', response);
			}
		} catch (error) {
			console.error('Error during sign up:', error);
			setServerErrors(error as { [key: string]: any });
		}
	};

	const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await signIn({ username, password });
			if (response) {
				console.log('Sign In Response:', response);
			}
		} catch (error) {
			console.error('Error during sign in:', error);
			setServerErrors(error as { [key: string]: any });
		}
	};

	return (
		<Form.Root onSubmit={handleSignUp}>
			<div className='flex flex-col gap-8 w-[32rem]'>
				<Form.Field
					name='email'
					serverInvalid={serverErrors.email}
					className='p-2 gap-2 flex justify-between'
				>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='text'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='input text-black'
					></Form.Control>
					{serverErrors?.email && (
						<Form.Message forceMatch={true}>
							{serverErrors.email.message}
						</Form.Message>
					)}
				</Form.Field>
				<Form.Field
					name='password'
					serverInvalid={serverErrors.password}
					className='p-2 gap-2 flex justify-between'
				>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='input text-black'
					></Form.Control>
					{serverErrors?.password && (
						<Form.Message forceMatch={true}>
							{serverErrors.password.message}
						</Form.Message>
					)}
				</Form.Field>
				<Button type='submit' className='btn'>
					Sign Up
				</Button>
			</div>
		</Form.Root>
	);
};

export default Auth;
