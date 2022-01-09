import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repository/MessagesRepository";

interface IMessage {
    id: string;
}

class DeleteMessageService {
    async execute({ id }: IMessage){
        const messageRepository = getCustomRepository(MessagesRepository);

        const newMessage = messageRepository.create({ id })

        await messageRepository.delete(newMessage);

        return newMessage;
    }
}

export  { DeleteMessageService }