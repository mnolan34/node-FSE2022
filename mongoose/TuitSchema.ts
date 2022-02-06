import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: String, required: true},
    postedBy: {type: User, required: true},
}, {collection: 'users'});

export default TuitSchema;