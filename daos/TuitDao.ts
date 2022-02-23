import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";


export default class TuitDao implements TuitDaoI{

    private static tuitDao: TuitDao | null = null;
    public static getInstance = () =>{
        if(TuitDao.tuitDao == null){
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    private constructor(){}

   //Example by professor piazza
    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid})
            .exec();

    //Professor Piazza Example
   findTuitById = async (tid: string): Promise<any> =>
    TuitModel.findById(tid)
        /* populate with a string */
        .populate("postedBy")
        .exec();

   async createTuitByUser(uid: string, tuit: Tuit): Promise<any>{
       return await TuitModel.create(tuit);
   }

   updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
       TuitModel.updateOne(
           {_id: tid},
           {$set: tuit});

   deleteTuit = async (tid: string): Promise<any> =>
       TuitModel.findById(tid)
           .deleteOne()
}