import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: String, required: true },
    images: { type: String },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('Post', postSchema);

export default Post;
