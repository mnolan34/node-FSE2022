import {Request, Response, Express} from "express";
import Message from "../models/Message";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("./api/users/:uidFrom/messages/:uidTo",
                MessageController.messageController.userSendsMessage);
            app.delete("./api/users/:uidFrom/messages/:uidTo",
                MessageController.messageController.userDeletesMessage);
            app.get("./api/users/:uidTo/messages",
                MessageController.messageController.userViewsReceivedMessages);
            app.get("./api/users/:uidFrom/messages",
                MessageController.messageController.userViewsSentMessages);
        }
        return MessageController.messageController;
    }
    private constructor() {}

    userSendsMessage = (req: Request, res: Response) => {
        console.log(req.body);
        MessageController.messageDao.userSendsMessage
        (req.body, req.params.uidTo, req.params.uidFrom)
            .then(message => res.json(message));
    }

    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage
        (req.body, req.params.uidTo, req.params.uidFrom)
            .then(status => res.json(status));

    userViewsSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsSentMessages
        (req.params.uidFrom)
            .then((messages:Message[]) => res.json(messages));

    userViewsReceivedMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsReceivedMessages
        (req.params.uidTo)
            .then(messages => res.json(messages));
}