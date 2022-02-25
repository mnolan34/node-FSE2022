import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import Follow from "../models/Follow";
import FollowControllerI from "../interfaces/FollowControllerI";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uidFollowing/followers",
                FollowController.followController.findAllUsersFollowingUser);
            app.get("/api/users/:uidFollower/following",
                FollowController.followController.findAllUsersFollowedByUser);
            app.delete("/api/users/:uidFollowing/follows/:uidFollower",
                FollowController.followController.userUnFollowsUser);
            app.post("/api/users/:uidFollowing/follows/:uidFollower",
                FollowController.followController.userFollowsUser);
            //Custom One
            app.get("/api/follows", FollowController.followController.findAllFollows);
        }

        return FollowController.followController;
    }

    private constructor() {}

    findAllUsersFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowingUser
        (req.params.uidFollowing)
            .then(follows => res.json(follows));

    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser
        (req.params.uidFollower)
            .then(follows => res.json(follows));

    userUnFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnFollowsUser
        (req.params.uidFollowing, req.params.uidFollower)
            .then(status => res.json(status));

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser
        (req.params.uidFollowing, req.params.uidFollower)
            .then(follows => res.json(follows));

    findAllFollows = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollows()
            .then(follows =>res.json(follows));

}