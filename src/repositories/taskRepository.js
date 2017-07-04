const cache = require('memory-cache');
const uuid = require('uuid/v4');
const { merge, map } = require('ramda');

const all = () => map((id) => JSON.parse(cache.get(id)) || null, cache.keys());

const find = (id) => JSON.parse(cache.get(id)) || null;

const store = (data) => {
    const task = merge(data, {
        id: uuid(),
    });

    cache.put(task.id, JSON.stringify(task));

    return task;
}

const update = (id, data) => {
    const previousTask = find(id);

    if (!previousTask) return null;

    const newTask = merge(previousTask, data);

    cache.put(id, JSON.stringify(newTask));

    return newTask;
};

const destroy = (id) => cache.del(id);

module.exports = {
    all,
    find,
    store,
    update,
    destroy,
};
