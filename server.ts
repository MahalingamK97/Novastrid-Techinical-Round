import express, { Request, Response } from 'express';
import UserRouter from './src/routes/user.router';
import { logger } from './logger';
import bodyParser from 'body-parser';
import ChatRouter from './src/routes/chat.router';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-'+ Date.now()+ path.extname(file.originalname))
    }
})

export const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if(ext != '.xlsx' && ext != 'xls') {
            return cb(new Error('Please upload in xlsx format'))
        }
        cb(null, true)
    }
})

const app = express();

app.use(express.json())
app.use(bodyParser.json())
app.use(logger);

app.use('/user', UserRouter);
app.use('/chat', ChatRouter);


app.get('/', (req: Request, res: Response) => {
    res.send('App Started');
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})