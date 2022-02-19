import Tuit from "./Tuit";
import User from "./User";
/**
 * Similar Model to lecture
 */

export default interface Like {
    tuit: Tuit,
    likedBy: User
};
