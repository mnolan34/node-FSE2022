import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";


export default class TuitDao implements TuitDaoI{

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

   //Example by professor piazza
    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});
   //async findTuitsByUser(uid: string): Promise<Tuit[]>{
    //return await TuitModel.findByUser(uid);
  // }
    //Professor Piazza Example
   findTuitById = async (tid: string): Promise<any> =>
    TuitModel.findById(tid)
        .populate()
        .exec();
   async createTuit(tuit: Tuit): Promise<any>{
       return await TuitModel.create(tuit);
   }

   updateTuit = async (tid: string): Promise<any> =>
       TuitModel.findById(tid)
           .updateOne()

   deleteTuit = async (tid: string): Promise<any> =>
       TuitModel.findById(tid)
           .deleteOne()


}