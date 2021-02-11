var secretKey = process.env.SECRET_KEY;
var jwt = require("jsonwebtoken");
function createToken() {
    var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: "foobar",
    }, secretKey
    // { algorithm: "RS256" }
    );
    console.log("Encoded Token:", token);
    return token;
}
function verifyToken(token) {
    console.log("Verify Input: \n", token);
    try {
        var decoded = jwt.verify(token, secretKey);
        console.log("Decoded Token", decoded);
        return decoded;
    }
    catch (e) {
        // console.log(e);
        return null;
    }
}
module.exports = {
    createToken: createToken,
    verifyToken: verifyToken,
};
