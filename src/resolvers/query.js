import Post from '../models/post.js';

const resolvers = {
  Query: {
    posts: async (parent, args, { models }) => {
      return await Post.find();
    },
    post: async (parent, args, { models }) => {
      return await Post.findById(args.id);
    },
  },
};

export default resolvers;
