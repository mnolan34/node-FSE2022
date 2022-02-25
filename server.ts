/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
//Import Controllers
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";

//Mongoose control
import mongoose from "mongoose";
//var cors = require('cors');

const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_Pass;
const DB_URL = "cluster0.v4of9.mongodb.net";
const DB_NAME = "Tuiter";
const DB_QUERY = "retryWrites=true&w=majority";

const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}?${DB_QUERY}`;
mongoose.connect(connectionString);

//App Control
const app = express();
app.use(express.json());
//app.use(cors());

//Adding based on Piazza
app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

//Controller Instances
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);