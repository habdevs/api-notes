import { gql, useMutation } from '@apollo/client';

export interface SignUpData {
	username: string;
	email: string;
	password: string;
}

export interface SignUpResponse {
	signUp: string;
}

const SIGN_UP = gql`
	mutation SignUp($username: String!, $email: String!, $password: String!) {
		signUp(username: $username, email: $email, password: $password)
	}
`;

export function useSignUp() {
	const [signUpMutation] = useMutation<SignUpResponse, SignUpData>(SIGN_UP);

	const signUp = async ({
		username,
		email,
		password,
	}: SignUpData): Promise<SignUpResponse> => {
		try {
			const { data } = await signUpMutation({
				variables: { username, email, password },
			});
			if (!data) {
				throw new Error('No data received');
			}
			console.log('Sign Up Response:', data);
			return data;
		} catch (error) {
			console.error('Error during sign up:', error);
			throw error;
		}
	};

	return signUp;
}
