import mongoose, { Schema } from 'mongoose';

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.method('toJSON', function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
