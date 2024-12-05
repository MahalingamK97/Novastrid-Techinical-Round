
import { Router } from "express";
import chatController from "../controllers/chat.controller";
import { upload } from "../../server";
import { authMiddleware } from "../middlewares/auth.middleware";

const ChatRouter = Router();

ChatRouter.post('/import-file', [authMiddleware, upload.single('excel')], chatController.importChats) 
ChatRouter.get('/get-uploads',authMiddleware, chatController.getUploads)
export default ChatRouter;