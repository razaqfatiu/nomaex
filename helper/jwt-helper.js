require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = {
  async signAccessToken(userPayload) {
    try {
      const secret = process.env.TOKEN_SECRET
      const options = { expiresIn: '1d' }
      const signedToken = await jwt.sign(
        userPayload,
        secret,
        options,
      );
      return signedToken
    } catch (error) {
      return error
    }
  },
  verifyAccessToken(accessToken) {
    // return jwt.decode(token)
  },
  async signRefreshToken(userPayload) {
    try {
      const secret = process.env.REFRESH_TOKEN_SECRET
      const options = { expiresIn: '5m' }
      const signedRefreshToken = await jwt.sign(
        userPayload,
        secret,
        options,
      );
      return signedRefreshToken
    } catch (error) {
      return error
    }
  },
  async verifyRefreshToken(refreshToken) {
    try {
      const verifyRefToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      return verifyRefToken
    } catch (error) {
      return error
    }
  }
}