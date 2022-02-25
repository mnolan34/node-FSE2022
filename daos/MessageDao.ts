import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

export default class MessageDao implements MessageDaoI{
    //implement singleton patter
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null){
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    userSendsMessage =
        async(message: string, to: string, from: string): Promise<Message> =>
            MessageModel
                .create({message: message, to: to, from: from});

    userDeletesMessage =
        async(message: string, to: string, from: string): Promise<any> =>
            MessageModel
                .deleteOne({message: message, to: to, from: from});
    userViewsSentMessages =
        async(from: string): Promise<Message[]> =>
            MessageModel
                .find({from: from})
                .populate("from")
                .exec();


    userViewsReceivedMessages =
        async(to: string): Promise<Message[]> =>
            MessageModel
                .find({to: to})
                .populate("to")
                .exec();

    // Custom Two Down Below


}