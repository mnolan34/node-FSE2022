import User from "./users/User";

export default interface Message{
    body: String,
    sender: User,
    receiver: User,
    sentOn: Date
};