import Post from '../models/post.js';

const resolvers = {
  Query: {
    posts: async () => {
      return await Post.find().populate('comments');
    },
    post: async (parent, args) => {
      return await Post.findById(args.id).populate('comments');
    },
  },
};

export default resolvers;
