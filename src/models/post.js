import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	title: { type: String, required: true },
	text: { type: String, required: true },
	images: [{ type: String }],
}, {
	timestamp: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;