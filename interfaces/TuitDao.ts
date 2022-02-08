import Tuit from "../models/Tuit";

export default interface TuitDao{
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(uid: string) : Promise<Tuit[]>;
    findTuitById(tid: string) : Promise<Tuit>;
    //update: need to know poster
    createTuit(uid: string, tuit: Tuit) : Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit) : Promise<any>;
    deleteTuit(tid: string) : Promise<any>;
}