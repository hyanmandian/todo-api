const app = require('express')();
const bodyParser = require('body-parser');
const taskRepository = require('./repositories/taskRepository');
const { path, propOr, has, not } = require('ramda');

app.use(bodyParser.json());

app.get('/tasks', (req, res) => res.send(taskRepository.all()));

app.get('/tasks/:task', (req, res) => {
    const task = taskRepository.find(path(['params', 'task'], req));

    if (!task) return res.sendStatus(400);

    res.send(task);
});

app.post('/tasks', (req, res) => {
    const data = propOr({}, 'body', req);

    if (not(has('description', data))) return res.sendStatus(400);

    res.send(taskRepository.store(data));
});

app.put('/tasks/:task', (req, res) => {
    const data = propOr(null, 'body', req);
    const task = path(['params', 'task'], req);

    if (!taskRepository.find(task)) return res.sendStatus(400);

    res.send(taskRepository.update(task, data));
});

app.delete('/tasks/:task', (req, res) => {
    if (taskRepository.destroy(path(['params', 'task'], req))) return res.sendStatus(200);

    return res.sendStatus(400);
})

app.listen(1337);