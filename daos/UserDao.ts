import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

export default class UserDao implements UserDaoI{

    private static userDao: UserDao | null = null;
    public static getInstance = () =>{
        if(UserDao.userDao == null){
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    findAllUsers = async (): Promise<User[]> =>
        UserModel.find().exec();

    findUserById = async (uid: string): Promise<any> =>
        UserModel.findById(uid);

    //Changed to Promise<any> instead of void
    createUser = async (user: User): Promise<any> =>
        UserModel.create(user);

    deleteUser = async (uid: string): Promise<any> =>
        UserModel.deleteOne({_id: uid});

    deleteAllUsers = async (): Promise<any> =>
        UserModel.deleteMany({});

    updateUser = async (uid: string, user: User): Promise<any> =>
        UserModel.updateOne({_id: uid}, {$set: user})
}