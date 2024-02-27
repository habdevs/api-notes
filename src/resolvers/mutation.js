import Post from '../models/post.js';
import Comment from '../models/comment.js';

const resolvers = {
  Mutation: {
    newPost: async (parent, args) => {
      const newPost = new Post({
        title: args.title,
        content: args.content,
        tags: args.tags,
        author: args.author,
      });
      return await newPost.save();
    },
    addComment: async (parent, args) => {
      const post = await Post.findById(args.postId);
      if (!post) {
        throw new Error('Post not found');
      }
      const newComment = new Comment({
        text: args.text,
        author: args.author,
        user: args.user,
      });
      post.comments.push(newComment);
      await newComment.save();
      return await post.save();
    },
    updatePost: async (parent, { id, content: newContent }) =>
      (await Post.findByIdAndUpdate(
        id,
        { content: newContent },
        { new: true },
      )) ??
      (() => {
        throw new Error('Post not found');
      })(),
    deletePost: async (parent, args) =>
      !!(await Post.findByIdAndDelete(args.id)),
  },
};

export default resolvers;
