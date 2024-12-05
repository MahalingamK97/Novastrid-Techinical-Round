import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../constants/app.constant';

export const authMiddleware = (req: any, res:Response, next: NextFunction) => {
    if(!req.headers?.authorization) {
        res.status(400).json({
            message: 'Authentication Required'
        })
        return;
    }
    const token = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, JWT_SECRET_KEY, (err: any, payload: any) => {
        if(err) {
            res.status(400).json({
              message: 'Invalid Token',
            })
            return;
        }
        req['user'] = payload;
    })
    next()
}