import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repository/MessagesRepository";

interface IMessage {
    id: any;
    email: string;
    message: string
}

class UpdateMessageService {
    async execute({ id, email, message}:any){
        const messageRepository = getCustomRepository(MessagesRepository);

        const newMessage = messageRepository.create({id, email, message })

        const newObj = await messageRepository.update(id, newMessage);

        return;
    }
}


export  { UpdateMessageService }