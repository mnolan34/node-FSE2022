import express, {Request, Response} from 'express';
//Import Controllers
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";

//Mongoose control
import mongoose from "mongoose";


const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASS;
const DB_URL = process.env.DB_URL;
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";

const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}?${DB_QUERY}`;
mongoose.connect(connectionString);

//App Control
const app = express();
app.use(express.json());

//Adding based on Piazza
app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

//Controller Instances
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);


const PORT = 4000;
app.listen(process.env.PORT || PORT);