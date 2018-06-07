const save = require('../operations/save'),
    core = require('alb3rt-core'),
    CONFIG = core.config,
    STATUS_CODE = CONFIG.CONSTANTS.HTTP_CODE;

module.exports = new class Alb3rtDbDevices {
    store(data, insertionResultCallback) {
        const devices = Object.values(data),
            body = Object.assign({}, {
                _id: "devices",
                devices: devices || []
            });

        save('devices', body, insertionResultCallback, 'devices');
    }
}