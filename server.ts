import express, {Request, Response} from 'express';
//Import Controllers
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";

//Mongoose control
import mongoose from "mongoose";

const DB_USERNAME = 'doctorSung'; //process.env.DB_USERNAME;
const DB_PASSWORD = 'pass2022'; //process.env.DB_PASSWORD;
const connectionString = 'mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.2jivy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(connectionString, { useNewUrlParser: true});

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

//Below did not parse JSON correctly
//const userController = new UserController(app);
//const tuitController = new TuitController(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);