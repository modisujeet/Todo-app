const express = require('express');
// seeting for path in ejs file
const path = require('path'); 

// for connecting the config folder in index.js
const db = require('./config/mongoose');
const Todo = require('./models/todo')

const app = express();
const port = 8000;


// Set up the View Engine for ejs file rendring on browser
app.set('view engine', 'ejs');
// seeting up path for views folder
app.set('views', path.join(__dirname,'views'));

// ****************for adding parser one kind of miidleware*****************
app.use(express.urlencoded());

// set up the assets file for getting styles of html file
app.use(express.static('./assets'));

// ********* adding data dynamically to the page

var taskList = [
    {
        task  : "Add a task",
        date : "No DEADLINE",
        selectone: " choose "
    },
    {
        task : "Annual report submission Deadline",
        date :"12-oct-2019",
        selectone :"college"
    }
]

// ************* fetching data from server(and this is work as controller)
app.get('/', function(req,res){
    // console.log(req);
   
    Todo.find({}, function(err, todo){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }

        return res.render('home',{
            title : "todo list",
            task_list : todo });


    });
});


app.post('/create-task', function(req, res){

    Todo.create({
        task : req.body.task,
        date : req.body.date,
        selectone : req.body.selectone
    }, function(err, newTodo){
        if(err){
            console.log("error in creating a contact!");
            return;
        }
        console.log("**********", newTodo);
        return res.redirect('back');
    });
});








// setting up the server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the Server :${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});



