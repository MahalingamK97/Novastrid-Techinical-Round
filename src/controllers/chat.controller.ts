import { Request, Response } from 'express';
import chatRepository from '../repositories/chat.repostitory';
import xlsx from 'xlsx';
import EventEmitter from 'events';

let eventEmitter = new EventEmitter()

const importChats = async (req: any, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({
                message: 'Please upload an excel file'
            })
            return;
        }
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const headers = ['From', 'To', 'FromText', "ToText", "SentOn"];


        const workHeaders = xlsx.readFile(filePath, { sheetRows: 1 });
        const columns = xlsx.utils.sheet_to_json(workHeaders.Sheets[workbook.SheetNames[0]], { header: 1 })[0]

        for (let column of columns as string[]) {
            if (!headers.includes(column)) {
                res.status(400).json({
                    message: 'Invalid file headers'
                })
                return;
            }
        }

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(worksheet);
        console.log(data);
        const uploadHistory = await chatRepository.createChatUpload({
            uploadedBy: req['user'].id,
        })
        eventEmitter.emit('uploadFile', { data, uploadId: uploadHistory.id })
        res.status(200).json({
            message: 'File Uploaded successfully'
        })
    } catch (e) {
        console.log(e);
        res.status(422).json({
            message: 'Unable process the file'
        })
    }
}

const getUploads = async (req: any, res: Response) => {
    try {
        const userId = req['user'].id;
        let uploads = []
        if (!req.body?.status) {
            uploads = await chatRepository.getAllUploadHistory(userId);
        } else {
            uploads = await chatRepository.getUploadsByStatus(userId, req.body.status);
        }

        res.status(200).json({
            uploadHistory: uploads
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            message: 'Error occurred'
        })
    }

}

eventEmitter.on('uploadFile', async (args) => {
    const { chats, uploadId } = args;

    let limit = 100;
    while (limit > 0) {
        const chatArray = [];
        for (let i = 0; i < limit; i++) {
            const chat = chats.shift();
            chatArray.push({
                from: chat.From,
                fromText: chat.FromText,
                to: chat.To,
                toText: chat.ToText,
                textDate: chat.SentOn
            })
        }
        await chatRepository.importChats(chatArray)

        if (chats.length < 100) { limit = chats.length }
    }
    await chatRepository.updateUploadStatus(uploadId, 'Success')
})

export default { importChats, getUploads }