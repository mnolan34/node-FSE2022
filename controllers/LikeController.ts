import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeController";

export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;

    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.post("/api/users/:uid/likes/:tid",
                LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/unlikes/:tid",
                LikeController.likeController.userUnlikesTuit);
            app.get("/api/users/:uid/likes",
                LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes",
                LikeController.likeController.findAllUsersThatLikedTuit);
        }

        return LikeController.likeController;
    }

    private constructor() {}

    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit
        (req.params.uid, req.params.tid)
            .then(likes => res.json(likes));

    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit
        (req.params.uid, req.params.tid)
            .then(status => res.send(status));

    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit
        (req.params.tid).then(likes => res.json(likes));

    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
}
