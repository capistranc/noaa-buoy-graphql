const secretKey = process.env.SECRET_KEY;
import * as jwt from "jsonwebtoken";

function createToken() {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: "foobar",
    },
    secretKey
    // { algorithm: "RS256" }
  );
  console.log("Encoded Token:", token);
  return token;
}

function verifyToken(token) {
  console.log("Verify Input: \n", token);
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded Token", decoded);
    return decoded;
  } catch (e) {
    // console.log(e);
    return null;
  }
}

module.exports = {
  createToken,
  verifyToken,
};
