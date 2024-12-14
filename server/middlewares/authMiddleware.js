const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from headers

    if (!token) {
        return res.status(401).send('No token, authorization denied');
    }

    try {
        // Verify the token and extract the user ID
        const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your secret
        req.user = decoded.user; // Attach user info to request object
        next(); // Proceed to the next middleware/route
    } catch (err) {
        console.error(err);
        res.status(401).send('Token is not valid');
    }
};

module.exports = authMiddleware;
