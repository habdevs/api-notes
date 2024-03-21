import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
	query GetPosts {
		posts {
			id
			title
			content
			tags
			author
			createdAt
			updatedAt
		}
	}
`;

export function usePostsQuery() {
	return useQuery(GET_POSTS);
}
