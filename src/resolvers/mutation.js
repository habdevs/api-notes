import Post from '../models/post.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();
import gravatar from '../util/gravatar.js';


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
    signUp: async (parent, { username, email, password }, { models }) => {
      email = email.trim().toLowerCase();
      const hashed = await bcrypt.hash(password, 10);
      const avatar = gravatar(email);
      try {
        const user = await User.create({
          username,
          email,
          avatar,
          password: hashed,
        })
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  },
};

export default resolvers;
