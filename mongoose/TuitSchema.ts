import mongoose from "mongoose";
import UserModel from "./UserModel";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: String, required: true},
    postedBy: {type: UserModel, required: true},
}, {collection: 'tuits'});

export default TuitSchema;