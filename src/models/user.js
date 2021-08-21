import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ACCESS_TOKEN_EXPIRATION = 60 * 60; // 1 hour
const REFRESH_TOKEN_EXPIRATION = 24 * 60 * 60; // 1 day

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);

userSchema.method('toJSON', function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  delete object.password;
  return object;
});

userSchema.method('isPasswordMatch', function (password) {
  const isMatch = bcrypt.compareSync(password, this.password);
  return isMatch;
});

userSchema.method('generateAccessToken', async function () {
  const accessToken = jwt.sign(
    {
      id: this.id,
      email: this.email,
      role: this.role,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION }
  );

  return accessToken;
});

userSchema.method('generateRefreshToken', function () {
  const refreshToken = jwt.sign(
    {
      id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRATION }
  );

  return refreshToken;
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
