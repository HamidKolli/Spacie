const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    //console.log("TOKEN:  "+token)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(userId+" userid| "+req.body.login+" login")

    if (req.body.login && req.body.login != userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch(err) {
    console.log("catch "+err)
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};