import Post from '../models/post.js';

const resolvers = {
  Mutation: {
    newPost: async (parent, args, { models }) => {
     return await models.Post.create({
        title: args.title,
        content: args.content,
        tags: args.tags,
        author: args.author,
      });
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
