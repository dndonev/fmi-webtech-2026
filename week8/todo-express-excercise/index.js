import express from 'express';

const app = express();

app.use(express.json());

const todos = [
    {
        id: 1,
        value: 'sus',
        isDone: false,
        createdAt: new Date('2026-04-06'),
        updatedAt: new Date('2026-04-06')
    }
];

let nextId = 2;


app.get('/todos/', (req, res) => {
    res.send(todos);
});

app.get('/todos/:id/', (req, res) => {
    const reqId = Number(req.params.id);
    const todo = todos.find(t => t.id === reqId);
    if(!todo) {
        res.status(404).send({ error: 'No such item found' });
        return;
    }
    res.send(todo);
});

app.post('/todos/', (req, res) => {
    console.log(req.body);
    todos.push({
        id: nextId++,
        value: req.body.value,
        isDone: req.body.isDone || false,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.status(201).send(todos.at(-1));
});

app.delete('/todos/:id', (req, res) => {
    const delId = Number(req.params.id);
    const indexToDelete = todos.findIndex(t => t.id === delId);
    if(indexToDelete === -1) {
        res.status(404).send({ error: 'No such item found!' });
        return;
    }
    const deleted = todos.splice(indexToDelete, 1);
    res.send(deleted);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});