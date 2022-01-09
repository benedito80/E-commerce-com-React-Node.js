import { Request, Response } from "express";
import { UpdateMessageService } from "../services/UpdateMessageService";

class UpdateMessageController{
    async handle(request: Request, response: Response){
        const { id, email, message } = request.body;

        const updateMessageService = new UpdateMessageService();

        await updateMessageService.execute({ id, email, message});

        return response.json({ id, email, message});
    }
}

export { UpdateMessageController }