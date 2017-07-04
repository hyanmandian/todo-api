const expect = require('expect.js');
const taskRepository = require('./taskRepository');
const { prop } = require('ramda');

describe('taskRepository', () => {
    describe('#all()', () => {
        it('should return an array', () => {
            expect(taskRepository.all()).to.an('array');
        });
    });

    describe('#store()', () => {
        it('should store a task', () => {
            const task = {
                description: 'test',
            };

            expect(prop('description', task)).to.be(prop('description', taskRepository.store(task)));
        });
    });

    describe('#find()', () => {
        it('should return an object', () => {
            const task = taskRepository.store({
                'description': 'test',
            });

            expect(taskRepository.find(task.id)).to.an('object');
        });
    });

    describe('#update()', () => {
        it('should update a task', () => {
            const task = taskRepository.store({
                'description': 'test',
            });

            const updatedTask = taskRepository.update(task.id, {
                'description': 'tset',
            });

            expect(prop('description', taskRepository.find(updatedTask.id))).to.be('tset');
            expect(prop('id', taskRepository.find(updatedTask.id))).to.be(task.id);
        });
    });

    describe('#delete()', () => {
        it('should delete a task', () => {
            const task = taskRepository.store({
                'description': 'test',
            });

            expect(taskRepository.find(task.id)).to.an('object');
            expect(taskRepository.destroy(task.id)).to.be(true);
            expect(taskRepository.find(task.id)).to.be(null);
        });
    });
});