import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const fileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    type: {
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

fileSchema.plugin(mongoosePaginate);

fileSchema.method('toJSON', function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const File = mongoose.model('File', fileSchema);

export default File;
