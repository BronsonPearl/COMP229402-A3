import jwt from 'jsonwebtoken';
import UserModel from '../models/user-model.js';

const authMiddleware = async (req, res, next) => {
    const header = req.headers.authorization; // "Bearer <token>"
    const token = header && header.startsWith('Bearer ') ? header.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User no longer exists' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
}

export default authMiddleware;
