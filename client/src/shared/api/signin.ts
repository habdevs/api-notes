import { gql, useMutation } from '@apollo/client';

export interface SignInData {
	username: string;
	password: string;
}

export interface SignInResponse {
	signIn: string;
}

const SIGN_IN_MUTATION = gql`
	mutation SignIn($username: String!, $password: String!) {
		signIn(username: $username, password: $password)
	}
`;

export function useSignIn() {
	const [signInMutation] = useMutation<SignInResponse, SignInData>(
		SIGN_IN_MUTATION
	);

	const signIn = async ({
		username,
		password,
	}: SignInData): Promise<SignInResponse> => {
		try {
			const { data } = await signInMutation({
				variables: { username, password },
			});
			if (!data) {
				throw new Error('No data received');
			}
			console.log('Sign In Response:', data);
			return data;
		} catch (error) {
			console.error('Error during sign in:', error);
			throw error;
		}
	};

	return signIn;
}
