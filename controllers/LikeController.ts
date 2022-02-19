import {Request, Response, Express} from "express";
import LikeDao from "../daos/LikeDao";
import Like from "../models/Like";
import LikeControllerI from "../interfaces/LikeController";
import mongoose from "mongoose";


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

    private constructor() {
    }

}
