import { Request, Response } from 'express';
import userRepository from '../repositories/user.repository';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants/app.constant';

const createUser = async (req: any, res: Response) => {
    try {
        console.log(req['user'])
        const body = req.body;
        const user = await userRepository.createUser({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password
        })
        console.log('User Created *** ', user)
        res.status(200).json(user);
    } catch (e) {
        console.log(e)
        res.status(422).json({ message: 'Some error occurred' })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.getUser(req.body.email);
        if (!user) {
            res.status(400).json({ status: 'Failed', message: 'Invalid user credentials' });
            return;
        }
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
            status: 'Success',
            message: 'Authentication successful',
            token
        })
    } catch (e) {
        console.log(e);
        res.status(422).json({ message: 'Some error occurred' })
    }
}

export default { login, createUser }