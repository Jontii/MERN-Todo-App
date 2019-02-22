const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todoModel');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});

todoRoutes.route('/').get(function(req, res) {
    Todo.find((err, todos) => {
        if (err)
            console.log(err);
        else
            res.json(todos);
    });
});

todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.json(todo);
    });
});

todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo:': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo)
            res.status(404).send('data is not found');
        else {
            todo.todoDescription = req.body.todoDescription;
            todo.todoResponsible = req.body.todoResponsible;
            todo.todoPriority = req.body.todoPriority;
            todo.todoCompleted = req.body.todoCompleted;

            todo.save().then(() => {
                res.json('Todo uppdated');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        };
    });
});

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});