import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // Attach decoded user to request
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};
