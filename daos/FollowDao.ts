import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}


    findAllUsersFollowingUser =
        async (uid: string): Promise<Follow[]> =>
            FollowModel
                .find({userFollowed: uid})
                .populate("userFollowing")
                .exec();

    findAllUsersFollowedByUser =
        async (uid: string): Promise<Follow[]> =>
            FollowModel
                .find({userFollowing:uid})
                .populate("userFollowed")
                .exec();
    userFollowsUser =
        async (uidFollowing: string, uidFollower: string): Promise<Follow> =>
            FollowModel
                .create({userFollowed: uidFollowing, userFollowing: uidFollower});
    userUnFollowsUser =
        async (uidFollowing: string, uidFollower: string): Promise<any> =>
            FollowModel
                .deleteOne({userFollowed: uidFollowing, userFollowing: uidFollower});
}