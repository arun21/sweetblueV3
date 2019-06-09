const TokenHelper = require('../helpers/token.helper');

function extractTokenFromAuthHeader(authHeader) {
  var token;
  try {
    const tokenArr = authHeader.split(' ');
    var tokenType = tokenArr[0].toLowerCase();

    if (tokenType.includes('bearer')) {
      token = tokenArr[1];
    }
  } catch (e) { }

  return token;
}

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = extractTokenFromAuthHeader(authHeader);

  if (!token) {
    return res.status(401).send({ message: 'No auth token found' });
  }

  try {
    const verifiedUser = await TokenHelper.verify(token);
    req.currentUser = verifiedUser;
    next();
  }
  catch(err) {
    console.log('Token verification error', err);
    return res.status(401).send({ message: 'Token Expired. Please login again.' });
  }
}