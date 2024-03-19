import { useMutation } from '@apollo/client';
import React, { FormEvent, useState } from 'react';
import { useSignUp } from '@/shared/api/signup';
import { useSignIn } from '@/shared/api/signin';
const Auth = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = useSignUp();
	const signIn = useSignIn();

	const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await signUp({ username, email, password });
			console.log('Sign Up Response:', response);
		} catch (error) {
			console.error('Error during sign up:', error);
		}
	};

	const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await signIn({ username, password });
			console.log('Sign In Response:', response);
		} catch (error) {
			console.error('Error during sign in:', error);
		}
	};

	return (
		<div>
			<h1>Authentication</h1>
			<form onSubmit={handleSignUp}>
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type='submit'>Sign Up</button>
			</form>
			<form onSubmit={handleSignIn}>
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type='submit'>Sign In</button>
			</form>
		</div>
	);
};

export default Auth;
