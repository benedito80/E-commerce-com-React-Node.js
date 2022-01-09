import { Router, Request, Response } from "express";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { DeleteMessageController } from "./controllers/DeleteMessageController";
import { UpdateMessageController } from "./controllers/UpdateMessageController";
import { ListMessageController } from "./controllers/ListMessageController";

const router = Router();

const createMessageController = new CreateMessageController();
const deleteMessageController = new DeleteMessageController();
const updateMessageController = new UpdateMessageController();
const listMessageController = new ListMessageController();

router.get('/', (request: Request, response: Response) => {
    return response.json({message: 'Bem vindo a API Dio Shopping'})
})

router.get('/message', listMessageController.hanle)
router.post('/message', createMessageController.handle)
router.put('/message', updateMessageController.handle)
router.delete('/message/:id', deleteMessageController.handle)

export { router }
