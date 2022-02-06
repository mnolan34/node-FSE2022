import Tuit from "../models/User";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI{
   async findAllTuits(): Promise<Tuit[]>{
         return await TuitModel.find();
   }
   async findTuitsByUser(): Promise<Tuit[]>{
    return await TuitModel.findByUser(uid);
   }
   async findTuitById(): Promise<Tuit>{
    return await TuitModel.findByID(tid);
   }
   async createTuit(): Promise<Tuit>{
    return await TuitModel.create(tuit);
   }
   async updateTuit(): Promise<any>{
    return await TuitModel.updateOne({_id:tid}, {$set: user})
   }
    deleteTuit
}