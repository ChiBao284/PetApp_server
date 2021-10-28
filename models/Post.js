import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Post must have content'],
      trim: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Post must have AccessToken'],
      ref: 'User'
    }
  },
  //createdAt and updateAt
  { timestamps: true }
);
export const Post = mongoose.model('Post', postSchema);
