import Message from "../models/Message";

export default interface MessageDaoI{
    userSendsMessage (message: string, to: string, from: string): Promise<Message>;
    userDeletesMessage (message: string, to: string, from: string): Promise<any>;
    userViewsSentMessages(from: string): Promise<Message[]>;
    userViewsReceivedMessages(to: string): Promise<Message[]>;
    /* Custom Two Below */
};