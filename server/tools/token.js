const jwt = require("jsonwebtoken");

exports.getLoginFromToken = function (req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return decodedToken.userId;
}