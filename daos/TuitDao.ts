import Tuit from "../models/User";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI{
   async findAllTuits(): Promise<Tuit[]>{
         return await TuitModel.find();
   }
   async findTuitsByUser(uid: string): Promise<Tuit[]>{
    return await TuitModel.findByUser(uid);
   }
   async findTuitById(tid: string): Promise<Tuit>{
    return await TuitModel.findByID(tid);
   }
   async createTuit(tuit: Tuit): Promise<Tuit>{
    return await TuitModel.create(tuit);
   }
   async updateTuit(tid: string, tuit: Tuit): Promise<any>{
    return await TuitModel.updateOne({_id:tid}, {$set: Tuit});
   }

   async deleteTuit(tid: string): Promise<any>{
       return await TuitModel.update
   }
}