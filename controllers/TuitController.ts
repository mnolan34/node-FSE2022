import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import Tuit from "../models/Tuit";
import TuitControllerI from "../interfaces/TuitController";

//Implemented Singleton Pattern

export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController| null = null;
    public static getInstance= (app: Express): TuitController=>{
        if(TuitController.tuitController === null){
            TuitController.tuitController = new TuitController();
            app.get('/tuits', TuitController.tuitController.findAllTuits);
            app.get('/tuits/:tid', TuitController.tuitController.findTuitById);
            app.get('/tuits/:uid/tuits', TuitController.tuitController.findTuitsByUser);
            app.post('/tuits', TuitController.tuitController.createTuit);
            app.delete('/tuits/:tid', TuitController.tuitController.deleteTuit);
            app.put('/tuits/:tid', TuitController.tuitController.updateTuit);
        }
        return TuitController.tuitController;
    }
    private constructor(){}

    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuit => res.json(tuit));
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuit => res.json(tuit));
    createTuit = (req: Request, res: Response) => {
        console.log(req.body);
        TuitController.tuitDao.createTuit(req.params.uid, req.body)
            .then(tuit => res.json(tuit));
    }
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.userid)
            .then(status => res.json(status));
}
