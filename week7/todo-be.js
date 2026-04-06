const express = require('express');
const app = express();
const port = 3001;

app.use(express.json())
let db = [
    {id: 1, value: "Make your bed", isDone: true, createdAt: Date.now().toString(), updatedAt: Date.now().toString()},
    {id: 2, value: "Brush your teeth", isDone: true, createdAt: Date.now().toString(), updatedAt: Date.now().toString()},
    {id: 3, value: "Drink coffee", isDone: false, createdAt: Date.now().toString(), updatedAt: Date.now().toString()},
]

let dbIndex = 4;

app.get('/', (req, res) => {
  res.send('Zdraveite, kolegi!')
})
app.get('/todos', (req, res) => {
    return res.json(db);
})

app.get('/todos/:id', (req, res) => {
    const id = +req.params.id;

    if (!id) {
        res.status(400).send({error: "Invalid to do ID"});
    }
    const todo = db.find(x => x.id === id)

    if (!todo) {
        res.status(404).send({error: 'To Do not found!'});
    }

    return res.json(todo);
})

app.post('/todos', (req, res) => {
    const {value, isDone} = req.body;
    const createdAt = Date.now().toString();
    const updatedAt = Date.now().toString();
    const id = dbIndex++;

    const todo = {id: id, value: value, isDone: isDone, createdAt: createdAt, updatedAt: updatedAt}
    db.push(todo);

    return res.json(todo);
})

app.put('/todos/:id', (req, res) => {
    const id = +req.params.id;
    const todo = db.find(x => x.id === id)

    if (!todo) {
        res.status(404).send({error: 'To Do not found!'});
    }

    const {isDone} = req.body;

    todo.isDone = isDone;
    todo.updatedAt = Date.now().toString();

    return res.json(todo);
})




app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`)
})

