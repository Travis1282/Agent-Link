const 	express = require('express'); 
const	app = express();	
const	bodyParser = require('body-parser');
const	session = require('express-session');
const	methodOverride = require('method-override');
<<<<<<< HEAD
require('dotenv').config();
const	port = process.env.PORT || 3000;


=======
const	port = process.env.PORT || 3000;
>>>>>>> a330afb0463ab116aac15dbb85b3c8a117b962be

// const 	mongoUri = process.env.DB_HOST || 'mongodb://localhost:27017/grocery_app_dev';
const 	mongoUri = 'mongodb://localhost:27017/grocery_app_dev';

require('dotenv').config();
// require('dotenv').config({path: './process.env'})
// db
require('./db/db.js')
// middleware
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: "This is the secret",
	resave: false,
	saveUninitialized: false
}))

// controllers
const UserController = require('./controllers/userController.js');
app.use('/user/', UserController);

const AgentController = require('./controllers/agentController.js');
app.use('/agent/', AgentController);

const HomeController = require('./controllers/homeController.js');
app.use('/home/', HomeController);

app.get('/',(req,res)=>{
	res.redirect('/user/login');
})

app.get('*',(req,res)=>{
	res.status(404).send('404')
})

app.listen(port,()=>{
	console.log('listening on ' + port);
})