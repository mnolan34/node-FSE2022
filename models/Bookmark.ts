import Tuit from "./tuits/Tuit";
import User from "./users/User";

export default interface Bookmark{
    tuitBooked: Tuit,
    userBooking: User
}