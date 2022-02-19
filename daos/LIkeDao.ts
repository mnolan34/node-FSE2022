import LikeDaoI from "../interfaces/LIkeDao";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";


export default class LikeDao implements LikeDaoI{
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();
    findAllTuitsLikedByUser =
        async (uid: string): Promise<Like[]> =>
            LikeModel
                .find({likedBy: uid})
                .populate("tuit")
                .exec();
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel
            .create({tuit: tid, likedBy: uid});
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel
            .deleteOne({tuit: tid, likedBy: uid});
}