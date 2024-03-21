import { useMutation, gql } from '@apollo/client';

const NEW_POST_MUTATION = gql`
	mutation NewPost(
		$title: String!
		$content: String!
		$tags: String!
		$author: String!
	) {
		newPost(title: $title, content: $content, tags: $tags, author: $author) {
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

export function useNewPostsMutation() {
	return useMutation(NEW_POST_MUTATION);
}
