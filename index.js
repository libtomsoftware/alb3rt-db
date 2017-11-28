const mongodb = require('mongodb'),
    setup = require('./setup');

module.exports = new class Alb3rtDB {
    constructor() {
        setup.init(mongodb);
    }
};
