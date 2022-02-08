import express, {Request, Response} from 'express';
//Import Controllers
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";

//Mongoose control
import mongoose from "mongoose";
mongoose.connect('mongodb+srv://doctorSung:pass2022@cluster0.2jivy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//App Control
const app = express();
//app.use(express.json());
//app.use(require('body-parser').urlencoded({extended: false}));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Adding based on Piazza

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome!'));

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