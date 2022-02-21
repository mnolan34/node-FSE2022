import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import UserDaoI from "../interfaces/UserDao";
import mongoose from "mongoose";

export default class UserDao implements UserDaoI{

    private static userDao: UserDao | null = null;
    public static getInstance = () =>{
        if(UserDao.userDao == null){
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }
    async findUserById(uid: string): Promise<any> {
        return await UserModel.findById(uid);
    }
    //Changed to Promise<any> instead of void
    async createUser(user: User): Promise<any>{
        return await UserModel.create(user);
    }
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: user})
    }
}