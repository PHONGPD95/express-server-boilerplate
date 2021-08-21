import jwt from 'jsonwebtoken';

import User from '~models/user';
import Token from '~models/token';

class AuthService {
  constructor() {
    this.userModel = User;
    this.tokenModel = Token;

    this.signIn = this.signIn.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  async signIn(data) {
    const { email, password } = data;

    const existedUser = await this.userModel.findOne({ email });
    if (!existedUser) {
      throw new Error('Invalid email or password.');
    }

    const isPasswordMatch = await existedUser.isPasswordMatch(password);
    if (!isPasswordMatch) {
      throw new Error('Invalid email or password.');
    }

    const accessToken = await existedUser.generateAccessToken();

    await this.tokenModel.create({
      token: accessToken,
      userId: existedUser.id,
    });

    const refreshToken = await existedUser.generateRefreshToken();

    const response = {
      user: existedUser,
      accessToken,
      refreshToken,
    };

    return response;
  }

  async refreshToken(token, refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const existedUser = await this.userModel.findById(decoded.id);
    if (!existedUser) {
      throw new Error('Invalid token.');
    }

    await this.tokenModel.deleteOne({ token, userId: existedUser.id });

    const accessToken = await existedUser.generateAccessToken();

    await this.tokenModel.create({
      token: accessToken,
      userId: existedUser.id,
    });

    const response = { accessToken };

    return response;
  }
}

export default AuthService;
