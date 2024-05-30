const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  // Extract token from request headers
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token is provided
  if (token == null) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  //Verify the token
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    req.user = user; // Set the decoded user information on the request object
    next();
  });
}

module.exports = authenticateToken;
