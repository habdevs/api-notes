import Post from '../models/post.js';

const resolvers = {
  Query: {
    postFeed: async (parent, { cursor }, { models }) => {
      const limit = 10;
      let hasNextPage = false;
      let cursorQuery = {};

      if (cursor) {
        cursorQuery = { _id: { $lt: cursor } };
      }

      const [posts, totalCount] = await Promise.all([
        // Запрос для получения данных с учетом пагинации
        Post.find(cursorQuery)
          .sort({ _id: -1 })
          .limit(limit + 1),

        // Запрос для получения общего количества элементов
        Post.countDocuments(),
      ]);

      if (posts.length > limit) {
        hasNextPage = true;
        posts.pop();
      }

      return {
        posts,
        cursor: posts[posts.length - 1]._id,
        hasNextPage,
        totalCount,
      };
    },
    user: async (parent, { username }, { models }) => {
      return await models.User.findOne({ username });
    },
    users: async (parent, args, { models }) => {
      return await models.User.find({});
    },
    me: async (parent, args, { models, user }) => {
      return await models.User.findById(user.id);
    },
    posts: async (parent, args, { models }) => {
      return await Post.find().limit(100);
    },
    post: async (parent, args, { models }) => {
      return await Post.findById(args.id);
    },
  },
};

export default resolvers;
