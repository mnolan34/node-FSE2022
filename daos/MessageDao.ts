import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";

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
        async(message: Message, toID: string, fromID: string): Promise<Message> =>
            MessageModel
                .create(message);

    userDeletesMessage =
        async(messageID: string): Promise<any> =>
            MessageModel
                .findById(messageID)
                .deleteOne();
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

    async findAllMessages(): Promise<Message[]> {
        return await MessageModel.find();
    }


}