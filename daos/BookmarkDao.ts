import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";

export default class BookmarkDao implements BookmarkDaoI{
    //Implement singleton pattern
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null){
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    userBookmarksTuit =
        async (tid: string, uid: string): Promise<any> =>
            BookmarkModel
                .create({bookmarkedTuit: tid, bookmarkedBy: uid});

    userUnBookmarksTuit =
        async (tid: string, uid: string): Promise<any> =>
            BookmarkModel
                .deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});

    userViewsBookmarkList =
        async (uid: string): Promise<Bookmark[]> =>
            BookmarkModel
                .find({bookmarkedBy: uid})
                .populate("bookmarkedTuit")
                .exec();
    /* Custom Two Down below */
};