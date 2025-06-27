import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const requireAuth: RequestHandler = (
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({error: 'Auth header missing or malformed'});
        return;
    }
    
    const token = authHeader.split(' ')[1];
    // We should have the jwt now so we decode to make sure it matches
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {userId: string};

        req.user = {id: decoded.userId};
        next();
    } catch (err) {
        res.status(401).json({error: "Invalid or expired token"});
    }
}