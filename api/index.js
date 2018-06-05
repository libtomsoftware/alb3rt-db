const core = require('alb3rt-core'),
    logs = require('./resources/logs'),
    custom = require('./resources/custom');

module.exports = new class Alb3rtDBApi {
    init() {
        core.api.extend('logs', logs);
        core.api.extend('custom', custom);
    }
};