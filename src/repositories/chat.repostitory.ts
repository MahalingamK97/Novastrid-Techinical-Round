// @ts-ignore

import db from '../models/index.js'

const createChatUpload = async (input: any) => {
    const upload = await db.ChatImport.create({
        uploadedBy: input.uploadedBy,
        status: 'Inprogress'
    })
    return upload;
}

const getAllUploadHistory = async (userId: number) => {
    const uploads = await db.ChatImport.findAll({
        where: { uploadedBy: userId },
    })
    return uploads;
}

const getUploadsByStatus = async (userId: number, status: any) => {
    const uploads = await db.ChatImport.findAll({
        where: {
            uploadedBy: userId,
            status
        },
    })
    return uploads;
}

const updateUploadStatus = async (uploadId: number, status: string) => {
    await db.ChatImport.update({
        status,
    }, {
        where: {
            id: uploadId
        }
    })
}

const importChats = async (input: any[]) => {
    await db.Chat.bulkCreate(input)
}
export default { createChatUpload, getAllUploadHistory, getUploadsByStatus, updateUploadStatus, importChats }