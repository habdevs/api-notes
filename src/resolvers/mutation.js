import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();
import gravatar from '../util/gravatar.js';
import Post from '../models/post.js';
import User from '../models/user.js';

const resolvers = {
  Mutation: {
    newPost: async (parent, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a post');
      }
      return await models.Post.create({
        title: args.title,
        content: args.content,
        tags: args.tags,
        author: new mongoose.Types.ObjectId(user.id),
      });
    },
    updatePost: async (parent, { id, content }, { models, user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to update a post');
      }

      const post = await models.Post.findById(id);
      if (post && String(post.author) !== user.id) {
        throw new ForbiddenError('You are not allowed to update this post');
      }
      return await models.Post.findOneAndUpdate(
        { _id: id },
        { $set: { content } },
        { new: true },
      );
    },
    deletePost: async (parent, { id }, { models, user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to delete a post');
      }
      const post = await models.Post.findById(id);
      if (post && String(post.author) !== user.id) {
        throw new ForbiddenError('You are not allowed to delete this post');
      }

      try {
        await post.remove();
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
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
        });
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
      if (email) {
        email = email.trim().toLowerCase();
      }

      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new AuthenticationError('Invalid password');
      }

      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
  },
};

export default resolvers;
